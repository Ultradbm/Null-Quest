/** @format */
import { Fragment } from "react";
import { EditQuest } from "./EditQuest";
import { Flipper, Flipped } from "react-flip-toolkit";

export const QuestList = ({ quests, setQuests, fetchQuests }) => {
  const finishQuest = async (e, id) => {
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.classList.remove("quest-row");
    e.target.parentNode.parentNode.classList.add("quest-finished");
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      console.log("Finished Quest");
      setTimeout(() => {
        setQuests(quests.filter((quest) => quest.todo_id !== id));
      }, 100);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="quest-list">
      <Flipper flipKey={quests.join("")}>
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {quests.map((quest) => {
              return (
                <Flipped key={quest.todo_id} flipId={quest.todo_id}>
                  <tr
                    key={quest.todo_id}
                    className="quest-row"
                    onAnimationEnd={() => console.log("animation ended")}
                  >
                    <td>{quest.description}</td>
                    <td>
                      <EditQuest quest={quest} fetchQuests={fetchQuests} />
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          finishQuest(e, quest.todo_id);
                        }}
                      >
                        Finish Quest
                      </button>
                    </td>
                  </tr>
                </Flipped>
              );
            })}
          </tbody>
        </table>
      </Flipper>
    </div>
  );
};

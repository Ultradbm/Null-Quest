/** @format */
import { Fragment, useEffect, useRef, useState } from "react";

export const EditQuest = ({ quest, fetchQuests }) => {
  const [description, setDescription] = useState(quest.description);
  const modalRef = useRef(null);

  // useEffect(() => {
  //   setTimeout(
  //     () =>
  //       modalRef.on("hidden.bs.modal", () => {
  //         console.log("modal hidden");
  //       }),
  //     3000
  //   );
  // }, []);
  const updateDescription = async (e) => {
    try {
      e.preventDefault();
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${quest.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      // window.location = "/";
      fetchQuests();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editQuest${quest.todo_id}`}
        onClick={() => setDescription(quest.description)} //set description back to correct value when opening to not have to worry about fixing the other stuff on closing
      >
        Edit Quest
      </button>

      <div
        className="modal fade"
        ref={modalRef}
        // onAnimationEnd={() => console.log("animation ended")} //not working
        id={`editQuest${quest.todo_id}`}
        tabIndex="-1"
        aria-labelledby={`editQuest${quest.todo_id}`}
        aria-hidden="true"
        // onClick={
        //   // () => setDescription(quest.description) // if use timeout here it will reset value after user clicks into input also which is not wanted
        // but doing this will override the timeout on close button clicks as clicking those is also clicking the modal. Animationend event not triggering but
        // if we were using react bootstrap package instead of cdn we would have access to "exited" event (occurs after animation ends)
        // }
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editQuest${quest.todo_id}`}>
                Edit Quest
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={
                //   () => setTimeout(() => setDescription(quest.description), 500) // modal animation is .3s --- works on both buttons but using on outside modal click
                //breaks it one way or another
                // }
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                // onClick={
                //   () => setTimeout(() => setDescription(quest.description), 500) // modal animation is .3s --- works on both buttons but using on outside modal click
                //breaks it one way or another
                // }
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => updateDescription(e)}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

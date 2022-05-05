/** @format */
import { Fragment, useState, useEffect } from "react";
import "./App.css";

//components
import { QuestInput } from "./components/QuestInput";
import { QuestList } from "./components/QuestList";

function App() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetchQuests();
  }, []);

  const fetchQuests = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setQuests(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <Fragment>
        <div className="container content">
          {/* <div className="test text-center">Get Started</div> */}
          <h1 className="text-center mt-5 test">Null Quest</h1>
          <QuestInput fetchQuests={fetchQuests} />
          <QuestList
            quests={quests}
            setQuests={setQuests}
            fetchQuests={fetchQuests}
          />
        </div>
      </Fragment>
    </div>
  );
}

export default App;

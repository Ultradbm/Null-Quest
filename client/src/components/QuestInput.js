/** @format */

import { Fragment, useState } from "react";

export const QuestInput = ({ fetchQuests }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      // window.location = "/"; //refereshes page (sets page to homepage I think)
      fetchQuests();
      setDescription("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">New Quest</button>
      </form>
    </Fragment>
  );
};

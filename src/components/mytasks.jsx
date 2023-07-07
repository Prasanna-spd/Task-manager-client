import React from "react";
import { BASE_URL } from "../services/helper";
import axios from "axios";

function MyTasks({ key, title, description }) {
  const handleButtonClick = async (field) => {
    try {
      const updatedValue = [key][field] ? false : true;

      const response = await axios.put(
        `${BASE_URL}/api/task/${key}`,
        { [field]: updatedValue },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // Add your desired logic here after updating the task
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card" style={{ width: "100%" }} key={key}>
      {/* <img className="card-img-top" src="..." alt="Card  cap" /> */}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button
          className="task-button completed"
          onClick={() => handleButtonClick("isCompleted")}
        >
          Completed
        </button>
        <button
          className="task-button in-progress"
          onClick={() => handleButtonClick("inProgress")}
        >
          In Progress
        </button>
        <button
          className="task-button not-started"
          onClick={() => handleButtonClick("notStarted")}
        >
          Not Started
        </button>
      </div>
    </div>
  );
}

export default MyTasks;

import React, { useState } from "react";
import { BASE_URL } from "../services/helper";
import axios from "axios";
import { toast } from "react-hot-toast";

function MyTasks({ taskId, title, description }) {
  const [taskStatus, setTaskStatus] = useState({
    isCompleted: "false",
    inProgress: "false",
    notStarted: "false",
  });

  const handleCompleted = async () => {
    try {
      setTaskStatus({
        isCompleted: true,
        inProgress: false,
        notStarted: false,
      });
      const response = await axios.put(
        `${BASE_URL}/api/task/${taskId}`,
        taskStatus,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const handleProgress = async () => {
    try {
      setTaskStatus({
        isCompleted: false,
        inProgress: true,
        notStarted: false,
      });
      const response = await axios.put(
        `${BASE_URL}/api/task/${taskId}`,
        taskStatus,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const handlestart = async () => {
    try {
      setTaskStatus({
        isCompleted: false,
        inProgress: false,
        notStarted: true,
      });
      const response = await axios.put(
        `${BASE_URL}/api/task/${taskId}`,
        taskStatus,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="card" style={{ width: "100%" }} key={taskId}>
      {/* <img className="card-img-top" src="..." alt="Card  cap" /> */}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button
          className="task-button completed"
          onClick={() => handleCompleted()}
        >
          Completed
        </button>
        <button
          className="task-button in-progress"
          onClick={() => handleProgress()}
        >
          In Progress
        </button>
        <button
          className="task-button not-started"
          onClick={() => handlestart()}
        >
          Not Started
        </button>
      </div>
    </div>
  );
}

export default MyTasks;

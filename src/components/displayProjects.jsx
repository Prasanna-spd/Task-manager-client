import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchProjectProgress } from "../features/project/projectSlice";
import { BASE_URL } from "../services/helper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DisplayProjects({ projectId, title, description, timeDue, subtasks }) {
  let navigate = useNavigate();
  const formattedTimeDue = new Date(timeDue).toLocaleString();
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/projects/subscribe/${projectId}`,
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

  const handleOpenProject = () => {
    dispatch(fetchProjectProgress(projectId));
    navigate(`/project/${projectId}`, {
      state: { projectData: { title, description, timeDue, subtasks } },
    });
  };

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p>Due Date and Time: {formattedTimeDue}</p>
        <p>Subtasks: {subtasks}</p>

        <button className="task-button completed" onClick={handleOpenProject}>
          Open
        </button>
        <button className="task-button in-progress" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default DisplayProjects;

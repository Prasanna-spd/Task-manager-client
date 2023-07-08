import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { toast } from "react-hot-toast";
import DisplayProjects from "../components/displayProjects";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [totalSubtasks, setTotalSubtasks] = useState(0);
  const [projects, setProjects] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateTimeChange = (event) => {
    setDueDateTime(event.target.value);
  };

  const handleTotalSubtasksChange = (event) => {
    const value = parseInt(event.target.value);
    setTotalSubtasks(value >= 0 ? value : 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/projects/newproject`,
        {
          title,
          description,
          timeDue: dueDateTime,
          subtasks: totalSubtasks,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      toast.success(response.data.message);
      fetchProjects();

      // Handle the response or redirect to a different page
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);

      // Handle the error
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/projects/allprojects`, {
        withCredentials: true,
      });
      setProjects(response.data.projects);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  // console.log(projects);
  return (
    <>
      <div className="navigationbar">
        <Navbar />
      </div>
      <div className="container">
        <h1>Start Your Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dueDateTime">Due Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="dueDateTime"
              value={dueDateTime}
              onChange={handleDueDateTimeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalSubtasks">Total Subtasks</label>
            <input
              className="form-control"
              id="totalSubtasks"
              type="number"
              value={totalSubtasks}
              onChange={handleTotalSubtasksChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Project
          </button>
        </form>

        <div className="container">
          <h2>Projects</h2>
          <div className="row">
            {projects.map((proj) => (
              <div
                key={proj._id}
                className="col-md-12"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  margin: "10px 0",
                }}
              >
                <DisplayProjects
                  projectId={proj._id}
                  title={proj.title}
                  description={proj.description}
                  timeDue={proj.timeDue}
                  subtasks={proj.subtasks}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProject;

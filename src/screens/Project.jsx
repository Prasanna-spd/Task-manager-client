import React, { useState } from "react";
import Navbar from "../components/navbar";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState("");
  const [totalSubtasks, setTotalSubtasks] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleDueTimeChange = (event) => {
    setDueTime(event.target.value);
  };
  const handleTotalSubtasksChange = (event) => {
    setTotalSubtasks(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data (e.g., submit to a server)
    console.log("Form submitted:", {
      title,
      description,
      dueDate,
      dueTime,
    });
  };

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
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueTime">Due Time</label>
            <input
              type="time"
              className="form-control"
              id="dueTime"
              value={dueTime}
              onChange={handleDueTimeChange}
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
      </div>
    </>
  );
}

export default AddProject;

import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-hot-toast";
import { BASE_URL } from "../services/helper";
import { BsPlusLg } from "react-icons/bs";

function AddTask() {
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    setTasks({ ...tasks, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/task/new`, tasks, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      // if (response.data.message === "Login First") {
      //   navigate("/login");
      // }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={tasks.title}
            placeholder="Enter title"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Enter description"
            value={tasks.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block d-flex align-items-center"
        >
          <BsPlusLg className="mr-2 " />
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;

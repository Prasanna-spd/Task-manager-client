import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../services/helper";
import MyTasks from "../components/mytasks";
import Navbar from "../components/navbar";

function Myprofile() {
  const [mytasks, setMytasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/task/my`, {
        withCredentials: true,
      });
      setMytasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(mytasks);
  return (
    <>
      <div className="navigationbar">
        <Navbar />
      </div>
      <div className="container">
        <h2>My Tasks</h2>
        <div className="row">
          {mytasks.map((task) => (
            <div
              key={task._id}
              className="col-md-12"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                margin: "10px 0",
              }}
            >
              <MyTasks
                taskId={task._id}
                title={task.title}
                description={task.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Myprofile;

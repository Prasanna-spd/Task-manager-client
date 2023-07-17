import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getCompleted, getInprogress } from "../features/project/projectSlice";
import Navbar from "../components/navbar";
// import { Chart } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IndivisualProjects() {
  const location = useLocation();
  const projectData = location.state.projectData;

  // const isCompleted = 5;
  // const inProgress = 4;
  const isCompleted = useSelector(getCompleted);
  const inProgress = useSelector(getInprogress);

  console.log(isCompleted, inProgress);
  const chartData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        label: "Project Status",
        data: [isCompleted, inProgress],
        backgroundColor: ["green", "yellow"],
        borderColor: "black", // Set the border color
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <>
      <div className="navigationbar">
        <Navbar />
      </div>
      <div>
        <h2>Individual Project</h2>
        <h3>Title: {projectData.title}</h3>
        {/* <p>Description: {projectData.description}</p>
      <p>Time Due: {projectData.timeDue}</p>
      <p>Subtasks: {projectData.subtasks}</p>
      Render other project data as needed */}
        <div style={{ height: "40vh", width: "80vh" }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </>
  );
}

export default IndivisualProjects;

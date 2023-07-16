import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getCompleted,
  getInprogress,
  getNotstarted,
} from "../features/project/projectSlice";
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

// Register the linear scale
// Chart.register(
//   Chart.controllers.bar,
//   Chart.scaleService.getScaleConstructor("linear")
// );
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// Chart.register();

function IndivisualProjects() {
  const location = useLocation();
  const projectData = location.state.projectData;

  const isCompleted = useSelector(getCompleted);
  const inProgress = useSelector(getInprogress);
  const notStarted = useSelector(getNotstarted);

  console.log(isCompleted, inProgress, notStarted);
  const chartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        label: "Project Status",
        data: [isCompleted, inProgress, notStarted],
        backgroundColor: ["green", "yellow", "red"],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        // max: Math.max(isCompleted, inProgress, notStarted) + 1,
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
        <Bar options={chartOptions} data={chartData} />
      </div>
    </>
  );
}

export default IndivisualProjects;

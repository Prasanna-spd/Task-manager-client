import React from "react";
import AddTask from "../components/addTask";
import Navbar from "../components/navbar";

function Home() {
  return (
    <>
      <div className="navigationbar">
        <Navbar />
      </div>
      <div className="container">
        <h1>WElcome to task Manager</h1>
        <AddTask />
      </div>
    </>
  );
}

export default Home;

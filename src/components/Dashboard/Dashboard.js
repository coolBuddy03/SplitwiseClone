import React, { useState } from "react";
import MiddlePanel from "./components/MiddlePanel/MiddlePanel";
import "./Dashboard.css";

function Dashboard() {


  return (
    <div id="center_container">
        <div id="center_bars">
            <MiddlePanel/>
        </div>
    </div>
  );
}

export default Dashboard;
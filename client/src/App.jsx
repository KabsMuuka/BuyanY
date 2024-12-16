import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../src/components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard />} // Redirect if not authenticated
        />

        <Route
          path="/profile"
          element={<Profile />} // Redirect if not authenticated
        />
      </Routes>
    </Router>
  );
}

export default App;

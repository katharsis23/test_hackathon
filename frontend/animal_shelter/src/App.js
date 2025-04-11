import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import OrganizationCabinet from "./pages/OrganizationCabinet/OrganizationCabinet";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginSignUp />} /> */}
        <Route path="/" element={<OrganizationCabinet />} /> // cabinet
      </Routes>
    </Router>
  );
}

export default App;

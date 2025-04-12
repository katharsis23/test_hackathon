import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Life4PawApp from "./pages/MainPage/Main.js"; // Make sure to add .js extension

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Life4PawApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

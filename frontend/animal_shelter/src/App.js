import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import OrganizationCabinet from "./pages/OrganizationCabinet/OrganizationCabinet";
import ArticleForm from "./pages/ArticleForm/ArticleForm";
import Search from "./pages/Search/Search";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/Search" element={<Search />} />
        {/* <Route path="/" element={<ArticleForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

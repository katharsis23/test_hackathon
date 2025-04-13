import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import OrganizationCabinet from "./pages/OrganizationCabinet/OrganizationCabinet";
import ArticleForm from "./pages/ArticleForm/ArticleForm";
import Life4PawApp from "./pages/MainPage/Main";
import OrganizationPage from "./pages/OrganizationCabinetPage/OrganizationPage";
import Search from "./pages/Search/Search";
import VolunteerCabinet from "./pages/VolunteerCabinet/VolunteerCabinet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginSignUp" element={<LoginSignUp />} />
        <Route path="/OrganizationCabinet" element={<OrganizationCabinet />} />
        <Route path="/ArticleForm" element={<ArticleForm />} />
        <Route path="/" element={<Life4PawApp />} />
        <Route path="/OrganizationPage" element={<OrganizationPage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/VolunteerCabinet" element={<VolunteerCabinet />} />
      </Routes>
    </Router>
  );
}

export default App;

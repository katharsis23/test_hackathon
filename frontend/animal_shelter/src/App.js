import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import OrganizationCabinet from "./pages/OrganizationCabinet/OrganizationCabinet";
import ArticleForm from "./pages/ArticleForm/ArticleForm";
import VolunteerCabinet from "./pages/VolunteerCabinet/VolunteerCabinet";
import Life4PawApp from "./pages/MainPage/Main";
import OrganizationPage from "./pages/OrganizationCabinetPage/OrganizationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginSignUp" element={<LoginSignUp />} />
        <Route path="/OrganizationCabinet" element={<OrganizationCabinet />} />
        <Route path="/ArticleForm" element={<ArticleForm />} />
<<<<<<< HEAD
        <Route path="/VolunteerCabinet" element={<VolunteerCabinet />} />
=======
        <Route path="/" element={<Life4PawApp />} />
        <Route path="/OrganizationPage" element={<OrganizationPage />} />
>>>>>>> d5e56f516d9bb5a9d74c1e3bea72be2e6752764b
      </Routes>
    </Router>
  );
}

export default App;

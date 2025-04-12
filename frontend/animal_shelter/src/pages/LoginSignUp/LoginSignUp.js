import React, { use, useReducer, useState } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import { set_user_type } from "../../services/cache";
import authService from "../../services/auth";
import axios from "axios";

const LoginSignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shelter_category, setShelterCategory] = useState("");
  const [shelter_address, setShelterAddress] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("volunteer");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authService.handle_login(username, password);

    if (response) {
      navigate("/");
    } else {
      alert("Login failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await authService.handle_signup(
      username,
      password,
      email,
      shelter_address,
      shelter_category
    );

    if (response) {
      setIsModalOpen(true);
    } else {
      alert("Signup failed.");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const response = await authService.handle_verification(verificationCode);

    if (response) {
      alert("Signup successful");
      setIsModalOpen(false);
      toggleForm();
      navigate("/");
    } else {
      alert("Signup failed.");
    }
  };

  return (
    <div className="pageLoginSignUpBodyContainer">
      <div className="headerLoginSignUp">
        <h1 onClick={() => navigate("/")}>Life4Paw</h1>
      </div>
      <div className="formBodyContainer">
        <div className="formContainer">
          <div className={`form-box ${!isLoginForm ? "active" : "hidden"}`}>
            <h1>Реєстрація</h1>
            <div className="tab-buttons">
              <button
                className={`tab-btn left ${
                  activeTab === "volunteer" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("volunteer");
                  set_user_type("volunteer");
                }}
              >
                Волонтер
              </button>
              <button
                className={`tab-btn right ${
                  activeTab === "organization" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("organization");
                  set_user_type("shelter");
                }}
              >
                Організація
              </button>
            </div>
            {activeTab === "volunteer" && (
              <form className="tab-content active" onSubmit={handleSignup}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ім'я:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Пароль:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Зареєструватись</button>
              </form>
            )}
            {activeTab === "organization" && (
              <form className="tab-content active" onSubmit={handleSignup}>
                <div className="form-group">
                  <label>Тип організації:</label>
                  <select required>
                    <option
                      value={shelter_category}
                      onChange={(e) => setShelterCategory(e.target.value)}
                      disabled
                      selected
                    >
                      Оберіть тип
                    </option>
                    <option value="vet">Ветеринарна клініка</option>
                    <option value="breeder">Розплідник</option>
                    <option value="shelter">Притулок</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Адреса організації:</label>
                  <input
                    type="text"
                    value={shelter_address}
                    onChange={(e) => setShelterAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ім'я організації:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Пароль:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Зареєструватись</button>
              </form>
            )}
            <div className="login_link">
              Вже з нами?{" "}
              <button type="button" onClick={toggleForm} className="loginBtn">
                Увійти
              </button>
            </div>
          </div>
          <div
            className={`form-box login ${isLoginForm ? "active" : "hidden"}`}
          >
            <h1>Логін</h1>
            <div className="tab-buttons">
              <button
                className={`tab-btn left ${
                  activeTab === "volunteer" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("volunteer");
                  set_user_type("volunteer");
                }}
              >
                Волонтер
              </button>
              <button
                className={`tab-btn right ${
                  activeTab === "organization" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("organization");
                  set_user_type("shelter");
                }}
              >
                Організація
              </button>
            </div>
            <form className="tab-content active" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Ім'я:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Пароль:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Увійти</button>
            </form>
            <div className="signup_link">
              Ще не зареєстровані??{" "}
              <button type="button" onClick={toggleForm} className="signupBtn">
                Реєстрація
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Підтвердження реєстрації</h2>
            <form onSubmit={handleVerification}>
              <div className="form-group">
                <label>Введіть код підтвердження:</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Підтвердити</button>
            </form>
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignUp;

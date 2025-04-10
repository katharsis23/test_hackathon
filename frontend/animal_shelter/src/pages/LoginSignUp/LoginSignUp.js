import React, { useState } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("volunteer");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, verificationCode }),
    });
    if (!response.ok) {
      throw new Error("Невірний код підтвердження");
    }
    alert("Реєстрація підтверджена!");
    setIsModalOpen(false);
    toggleForm();
  };

  return (
    <div className="pageLoginSignUpBodyContainer">
      <div className="headerLoginSignUp">
        <h1>Life4Paw</h1>
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
                onClick={() => setActiveTab("volunteer")}
              >
                Волонтер
              </button>
              <button
                className={`tab-btn right ${
                  activeTab === "organization" ? "active" : ""
                }`}
                onClick={() => setActiveTab("organization")}
              >
                Організація
              </button>
            </div>
            {activeTab === "volunteer" && (
              <form className="tab-content active">
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Ім'я:</label>
                  <input type="text" value={username} required />
                </div>
                <div className="form-group">
                  <label>Пароль:</label>
                  <input type="password" value={password} required />
                </div>
                <button type="submit">Зареєструватись</button>
              </form>
            )}
            {activeTab === "organization" && (
              <form className="tab-content active">
                <div className="form-group">
                  <label>Тип організації:</label>
                  <select required>
                    <option value="" disabled selected>
                      Оберіть тип
                    </option>
                    <option value="vet">Ветеринарна клініка</option>
                    <option value="breeder">Розплідник</option>
                    <option value="shelter">Притулок</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Ім'я організації:</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Пароль:</label>
                  <input type="password" required />
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
                onClick={() => setActiveTab("volunteer")}
              >
                Волонтер
              </button>
              <button
                className={`tab-btn right ${
                  activeTab === "organization" ? "active" : ""
                }`}
                onClick={() => setActiveTab("organization")}
              >
                Організація
              </button>
            </div>
            <form className="tab-content active">
              <div className="form-group">
                <label>Ім'я:</label>
                <input type="text" value={username} required />
              </div>
              <div className="form-group">
                <label>Пароль:</label>
                <input type="password" value={password} required />
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

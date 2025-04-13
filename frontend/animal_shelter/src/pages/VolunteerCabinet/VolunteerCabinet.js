import React, { useState, useEffect } from "react";
import "./VolunteerCabinet.css";
import volunteerImage from "../../assets/images/volunteer.svg";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import handsImage from "../../assets/images/hands.png";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";

const VolunteerCabinet = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await authService.get_user_info();
      if (response) {
        setUsername(response.data.username || response.data.name);
      } else {
        alert("Get user info failed.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="cabinetBodyContainer">
      <div className="cabinetHeader">
        <h1 onClick={() => navigate("/")}>Life4Paw</h1>
        <div className="headerBtnContainer">
          <div className="find" onClick={() => navigate("/ArticleForm")}>
            <h1>Знайшли тварину?</h1>
          </div>
        </div>
      </div>
      <div className="volunteerInfo">
        <div className="volunteerPhoto">
          <img src={volunteerImage} className="photo-img" />
        </div>
        <div className="volunteerNameBlock">
          <div className="volunteerName">
            <h1>{username}</h1>
          </div>
        </div>
      </div>
      <div className="volunteerArticlesBody">
        <div className="activeArticles">
          <h1>Улюблені оголошення: </h1>
        </div>
        <div className="articleCards">
          <div className="animalCard">
            <div className="animalImage">
              <img
                src="https://th.bing.com/th/id/R.121340b8cb0466ed586c78b496797212?rik=hJr%2bVRwSeXSoxQ&pid=ImgRaw&r=0"
                className="animalPhoto"
              />
            </div>
            <h2 className="animalName">Мурзік</h2>
            <div className="description">
              <h1 className="animalAge">
                <img src={ageImage} alt="Age" /> Вік: 10
              </h1>
              <h1 className="animalGender">
                <img src={genderImage} alt="Gender" />
                Хлопчик
              </h1>
            </div>
            <div className="organizationCardName">
              <img src={handsImage} alt="Organization" />
              ГоШелтер
            </div>
          </div>
          <div className="animalCard">
            <div className="animalImage">
              <img
                src="https://th.bing.com/th/id/OIP.Wl4ICx3mgr_UNcTl4DZ52QAAAA?rs=1&pid=ImgDetMain"
                className="animalPhoto"
              />
            </div>
            <h2 className="animalName">Мілка</h2>
            <div className="description">
              <h1 className="animalAge">
                <img src={ageImage} alt="Age" /> Вік: 2
              </h1>
              <h1 className="animalGender">
                <img src={genderImage} alt="Gender" />
                Дівчинка
              </h1>
            </div>
            <div className="organizationCardName">
              <img src={handsImage} alt="Organization" />
              ВусаЛапиХвіст
            </div>
          </div>
          <div className="animalCard">
            <div className="animalImage">
              <img
                src="https://th.bing.com/th/id/OIP.Q0A35f2q_4NCwjB3slN6wQHaJ4?rs=1&pid=ImgDetMain"
                className="animalPhoto"
              />
            </div>
            <h2 className="animalName">Анатолій</h2>
            <div className="description">
              <h1 className="animalAge">
                <img src={ageImage} alt="Age" /> Вік: 5
              </h1>
              <h1 className="animalGender">
                <img src={genderImage} alt="Gender" />
                Хлопчик
              </h1>
            </div>
            <div className="organizationCardName">
              <img src={handsImage} alt="Organization" />
              Добрі руки
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCabinet;

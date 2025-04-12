import React, { useState } from "react";
import "./ArticleForm.css";
import genderImage from "../../assets/images/gender.png";
import catImage from "../../assets/images/cat.png";
import dogImage from "../../assets/images/dog.png";
import { useNavigate } from "react-router-dom";
import Article_Service from "../../services/article_service";
import Article from "../../models/article_model";
import { get_user_id, get_user_type } from "../../services/cache";

const ArticleForm = () => {
  const [newArticle, setNewArticle] = useState({
    name: "",
    sex: "",
    age: "",
    animal_type: "",
    health_status: "",
    description: "",
    photo_url: "",
  });

  const navigate = useNavigate();

  const validateInput = () => {
    if (!newArticle.name.trim()) {
      alert("Ім'я не може бути порожнім");
      return false;
    }
    if (!newArticle.sex) {
      alert("Будь ласка, оберіть стать");
      return false;
    }
    if (newArticle.age === "" || isNaN(newArticle.age) || newArticle.age < 0) {
      alert("Вік має бути додатнім числом");
      return false;
    }
    if (!newArticle.animal_type) {
      alert("Будь ласка, оберіть тип тварини");
      return false;
    }
    if (!newArticle.health_status) {
      alert("Будь ласка, оберіть стан здоров'я");
      return false;
    }
    if (!newArticle.photo_url.trim()) {
      alert("Будь ласка, введіть посилання на фото");
      return false;
    }
    return true;
  };

  const articleService = new Article_Service();

  const saveArticle = async () => {
    if (validateInput()) {
      try {
        const userId = get_user_id();
        const userType = get_user_type();

        if (!userId || !userType) {
          alert("Не вдалося отримати дані користувача.");
          return;
        }

        const article = new Article({
          ...newArticle,
          age: parseInt(newArticle.age, 10),
          volunteer_id: userType === "volunteer" ? userId : null,
          shelter_id: userType === "shelter" ? userId : null,
        });

        console.log("Article to be sent:", article.toJSON());

        const response = await articleService.createArticle(article);
        console.log("Article saved to DB:", response);
        alert("Оголошення збережено в базі даних!");

        navigate("/OrganizationCabinet");
      } catch (error) {
        console.error("Error saving article:", error);
        alert("Помилка при збереженні оголошення.");
      }
    }
  };

  return (
    <div className="articleFormBody">
      <div className="articleFormHeader">
        <h1>Life4Paw</h1>
      </div>
      <div className="articleForm">
        <div className="formContent">
          <h2>Створення оголошення</h2>
          <div className="formBody">
            <div className="formImage">
              <label>
                Посилання на фото:
                <input
                  type="text"
                  value={newArticle.photo_url}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      photo_url: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="formFields">
              <label>
                Ім'я:
                <input
                  type="text"
                  value={newArticle.name}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Стать:
                <div className="genderButtons">
                  <button
                    className={`genderButton left ${
                      newArticle.sex === "Дівчинка" ? "active" : ""
                    }`}
                    onClick={() =>
                      setNewArticle({
                        ...newArticle,
                        sex: "Дівчинка",
                      })
                    }
                  >
                    <img src={genderImage} alt="Дівчинка" /> Дівчинка
                  </button>
                  <button
                    className={`genderButton right ${
                      newArticle.sex === "Хлопчик" ? "active" : ""
                    }`}
                    onClick={() =>
                      setNewArticle({
                        ...newArticle,
                        sex: "Хлопчик",
                      })
                    }
                  >
                    <img src={genderImage} alt="Хлопчик" /> Хлопчик
                  </button>
                </div>
              </label>
              <label>
                Вік:
                <input
                  type="number"
                  value={newArticle.age}
                  onChange={(e) => {
                    const age = Math.max(0, e.target.value);
                    setNewArticle({
                      ...newArticle,
                      age: age,
                    });
                  }}
                />
              </label>
              <label>
                Хто:
                <div className="typeButtons">
                  <button
                    className={`typeButton ${
                      newArticle.animal_type === "dogs" ? "active" : ""
                    }`}
                    onClick={() =>
                      setNewArticle({
                        ...newArticle,
                        animal_type: "dogs",
                      })
                    }
                  >
                    <img src={dogImage} alt="Пес" /> Пес
                  </button>
                  <button
                    className={`typeButton ${
                      newArticle.animal_type === "cats" ? "active" : ""
                    }`}
                    onClick={() =>
                      setNewArticle({
                        ...newArticle,
                        animal_type: "cats",
                      })
                    }
                  >
                    <img src={catImage} alt="Кіт" /> Кіт
                  </button>
                </div>
              </label>
              <label>
                Стан здоров'я:
                <select
                  value={newArticle.health_status}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      health_status: e.target.value,
                    })
                  }
                >
                  <option value="">Оберіть стан</option>
                  <option value="З особливостями">З особливостями</option>
                  <option value="Потребує лікування">Потребує лікування</option>
                  <option value="Здоровий">Здоровий</option>
                </select>
              </label>
              <label>
                Опис:
                <textarea
                  value={newArticle.description}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      description: e.target.value,
                    })
                  }
                />
              </label>
            </div>
          </div>
          <button className="saveButton" onClick={saveArticle}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;

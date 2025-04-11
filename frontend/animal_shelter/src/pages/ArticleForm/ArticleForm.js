import React, { useState, useEffect } from "react";
import "./ArticleForm.css";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import catImage from "../../assets/images/cat.png";
import dogImage from "../../assets/images/dog.png";

import { useNavigate } from "react-router-dom";

const ArticleForm = () => {
  const [newArticle, setNewArticle] = useState({});

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
              {newArticle.photo_url ? (
                <img
                  src={newArticle.photo_url}
                  alt="Фото тваринки"
                  className="animalPhotoPreview"
                />
              ) : (
                <div className="imagePlaceholder">Фото тваринки</div>
              )}
              <label className="customFileUpload">
                Вибрати фото
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setNewArticle({
                          ...newArticle,
                          photo_url: event.target.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
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
                    <img src={genderImage}></img>Дівчинка
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
                    <img src={genderImage}></img>Хлопчик
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
                      newArticle.animal_type === "Пес" ? "active" : ""
                    }`}
                    onClick={() =>
                      setNewArticle({
                        ...newArticle,
                        animal_type: "Пес",
                      })
                    }
                  >
                    <img src={dogImage}></img>Пес
                  </button>
                  <button
                    className={`typeButton ${
                      newArticle.animal_type === "Кіт" ? "active" : ""
                    }`}
                    onClick={() =>
                      setNewArticle({
                        ...newArticle,
                        animal_type: "Кіт",
                      })
                    }
                  >
                    <img src={catImage}></img>Кіт
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
          <button className="saveButton" onClick={"saveArticle"}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;

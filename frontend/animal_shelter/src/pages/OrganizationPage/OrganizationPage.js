import React, { useState, useEffect } from "react";
import "./OrganizationPage.css";
import shelterImage from "../../assets/images/animal-shelter.png";
import editImage from "../../assets/images/edit.png";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import animalImage from "../../assets/images/Pipa.jpg";
import handsImage from "../../assets/images/hands.png";
import catImage from "../../assets/images/cat.png";
import dogImage from "../../assets/images/dog.png";

import Article from "../../models/article_model";
import Comment from "../../models/comments_model";

import { useNavigate } from "react-router-dom";

const OrganizationCabinet = () => {
  // const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const base_url = "";
  const fetchArticles = async () => {
    try {
      const response = await fetch(`${base_url}/fetch_articles`);
      if (response.ok) {
        const data = await response.json();
        const articles = data.array_of_articles.map((item) =>
          Article.fromJSON(item)
        );
        setAnimal(articles);
      } else {
        console.error("Помилка завантаження оголошень:", response.status);
      }
    } catch (error) {
      console.error("Помилка під час запиту:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${base_url}/fetch_comments`);
      if (response.ok) {
        const data = await response.json();
        const fetchedComments = data.array_of_comments.map((item) =>
          Comment.fromJSON(item)
        );
        setComments(fetchedComments);
      } else {
        console.error("Помилка завантаження коментарів:", response.status);
      }
    } catch (error) {
      console.error("Помилка під час запиту:", error);
    }
  };

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `${base_url}/update_article/${selectedArticle.article_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedArticle),
        }
      );

      if (response.ok) {
        setAnimal((prev) =>
          prev.map((item) =>
            item.article_id === selectedArticle.article_id
              ? selectedArticle
              : item
          )
        );
        closeEditModal();
      } else {
        console.error("Помилка оновлення даних:", response.status);
      }
    } catch (error) {
      console.error("Помилка під час запиту:", error);
    }
  };

  const [animal, setAnimal] = useState([
    {
      id: 1,
      name: "Барсік",
      age: 3,
      sex: "Хлопчик",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 2,
      name: "Мурка",
      age: 2,
      sex: "Дівчинка",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 3,
      name: "Рекс",
      age: 5,
      sex: "Хлопчик",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 4,
      name: "Белла",
      age: 1,
      sex: "Дівчинка",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 5,
      name: "Шарік",
      age: 4,
      sex: "Хлопчик",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
  ]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticles();
    fetchComments();
  }, []);

  return (
    <div className="cabinetBodyContainer">
      <div className="cabinetHeader">
        <h1>Life4Paw</h1>
        <div className="headerBtnContainer">
          <div className="login">
            <h1>Увійти</h1>
          </div>
          <div className="find">
            <h1>Знайшли тварину?</h1>
          </div>
        </div>
      </div>
      <div className="organizationInfo">
        <div className="organizationPhoto">
          <img src={shelterImage} className="photo-img" alt="Shelter" />
        </div>
        <div className="organizationContacts">
          <div className="organizationName">
            <h1>Назва організації:</h1>
          </div>
          <div className="organizationCategory">
            <h1>Категорія: Притулок для тварин</h1>
          </div>
          <div className="organizationAddress">
            <h1>Адреса: Яворницького 3б львів</h1>
          </div>
        </div>
        <div className="donationInfo">
          <h2>Допомогти</h2>
          <div className="bankDetails">
            <p>
              <strong>Наші реквізити:</strong>
            </p>
            <p>Монобанк: 7473998238582</p>
            <p>Приватбанк: 7473998238582</p>
            <p>Номер телефону: 7473998238582</p>
          </div>
        </div>
      </div>
      <div className="organizationArticlesBody">
        <div className="activeArticles">
          <h1>Активні оголошення: </h1>
        </div>
        <div className="articleCards">
          {animal.map((article) => (
            <div className="animalCard" key={article.article_id}>
              <div className="animalImage">
                <img
                  src={article.photo_url || animalImage}
                  alt={article.name}
                  className="animalPhoto"
                />
              </div>
              <h2 className="animalName">{article.name}</h2>
              <div className="description">
                <h1 className="animalAge">
                  <img src={ageImage} alt="Age" /> Вік: {article.age}
                </h1>
                <h1 className="animalGender">
                  <img src={genderImage} alt="Gender" />
                  {article.sex}
                </h1>
              </div>
              <div className="organizationCardName">
                <img src={handsImage} alt="Organization" />
                {article.shelter_id}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="organizationCommentsBody">
        <div className="commentsText">
          <h1>Коментарі:</h1>
        </div>
        <div className="commentsCards">
          {comments.length > 0 ? (
            comments.map((comment) => (
              /*Приклад аби копіювати і вставляти*/
              <div className="commentCard" key={comment.comment_id}>
                <div className="commentHeader">
                  <h3 className="commentAuthor">Іван</h3>
                </div>
                <p className="commentText">{comment.description}</p>
              </div>
            ))
          ) : (
            <div className="commentCard">
              <div className="commentHeader">
                <h3 className="commentAuthor">Ніка</h3>
              </div>
              <p className="commentText">
                Чудовий притулок! Дуже привітний персонал та чисті умови для
                тварин, які там живуть. Я знайшла свого улюбленця тут і дуже
                щаслива! Рекомендую всім, хто шукає нового друга!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Редагування</h2>
            <div className="modalBody">
              <div className="modalImage">
                {selectedArticle.photo_url ? (
                  <img
                    src={selectedArticle.photo_url}
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
                          setSelectedArticle({
                            ...selectedArticle,
                            photo_url: event.target.result,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <div className="modalFields">
                <label>
                  Ім'я:
                  <input
                    type="text"
                    value={selectedArticle.name}
                    onChange={(e) =>
                      setSelectedArticle({
                        ...selectedArticle,
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
                        selectedArticle.sex === "Дівчинка" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedArticle({
                          ...selectedArticle,
                          sex: "Дівчинка",
                        })
                      }
                    >
                      <img src={genderImage}></img>Дівчинка
                    </button>
                    <button
                      className={`genderButton right ${
                        selectedArticle.sex === "Хлопчик" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedArticle({
                          ...selectedArticle,
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
                    value={selectedArticle.age}
                    onChange={(e) => {
                      const age = Math.max(0, e.target.value);
                      setSelectedArticle({
                        ...selectedArticle,
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
                        selectedArticle.animal_type === "Пес" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedArticle({
                          ...selectedArticle,
                          animal_type: "Пес",
                        })
                      }
                    >
                      <img src={dogImage}></img>Пес
                    </button>
                    <button
                      className={`typeButton ${
                        selectedArticle.animal_type === "Кіт" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedArticle({
                          ...selectedArticle,
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
                    value={selectedArticle.health_status}
                    onChange={(e) =>
                      setSelectedArticle({
                        ...selectedArticle,
                        health_status: e.target.value,
                      })
                    }
                  >
                    <option value="З особливостями">З особливостями</option>
                    <option value="Потребує лікування">
                      Потребує лікування
                    </option>
                    <option value="Здоровий">Здоровий</option>
                  </select>
                </label>
                <label>
                  Опис:
                  <textarea
                    value={selectedArticle.description}
                    onChange={(e) =>
                      setSelectedArticle({
                        ...selectedArticle,
                        description: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>
            <button className="saveButton" onClick={saveChanges}>
              Зберегти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationCabinet;

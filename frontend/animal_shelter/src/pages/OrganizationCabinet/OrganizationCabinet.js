import React, { useState, useEffect } from "react";
import "./OrganizationCabinet.css";
import shelterImage from "../../assets/images/animal-shelter.png";
import editImage from "../../assets/images/edit.png";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import animalImage from "../../assets/images/image.png";
import handsImage from "../../assets/images/hands.png";
import catImage from "../../assets/images/cat.png";
import dogImage from "../../assets/images/dog.png";

import { useNavigate } from "react-router-dom";
import { ArticleService } from "../../services/article_service";
import { get_user_id } from "../../services/cache";

const OrganizationCabinet = () => {
  const [comments, setComments] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articleService = new ArticleService();
  const shelterId = get_user_id();

  // Додано відсутні функції
  const fetchArticles = async () => {
    try {
      const articles = await articleService.fetchArticlesForShelter(shelterId);
      setAnimal(articles);
    } catch (error) {
      console.error("Помилка завантаження оголошень:", error);
    }
  };

  const fetchComments = async () => {
    setComments([]);
  };

  useEffect(() => {
    fetchArticles();
    fetchComments();
  }, []);

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  // Виправлений метод з використанням ArticleService
  const saveChanges = async () => {
    if (!selectedArticle) return;

    try {
      await articleService.edit_article(selectedArticle);
      setAnimal((prev) =>
        prev.map((item) =>
          item.article_id === selectedArticle.article_id
            ? selectedArticle
            : item
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Помилка оновлення:", error);
    }
  };

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
          <img src={shelterImage} className="photo-img" />
        </div>
        <div className="organizationContacts">
          <div className="organizationName">
            <h1>Назва організації:</h1>
          </div>
          <div className="organizationCategory">
            <h1>Категорія: притулок для тварин</h1>
          </div>
          <div className="organizationAddress">
            <h1>Адреса: яворницького 3б львів</h1>
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
              <div className="cardOptions">
                <button
                  className="editCard"
                  onClick={() => openEditModal(article)}
                >
                  <img src={editImage} alt="Edit" />
                </button>
                <button className="deleteCard">X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="takeAnimalsBody">
        <div className="takeAnimalsText">
          <h1>Прийом тваринок:</h1>
        </div>
        <div className="takeAnimalsCards">
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
                {article.volunteer_id}
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
          {comments.map((comment) => (
            <div className="commentCard" key={comment.comment_id}>
              <p className="commentText">{comment.description}111212</p>
              <p className="commentAuthor">
                Автор: {comment.volunteer_id}12121
              </p>
            </div>
          ))}
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

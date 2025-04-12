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

import Article_service from "../../services/article_service";
import CommentService from "../../services/comment_service";
import authService from "../../services/auth";
import { get_user_id } from "../../services/cache";
import UserModels from "../../models/user_model";
const { Shelter } = UserModels;

const OrganizationCabinet = () => {
  const [animal, setAnimal] = useState([]);
  const [animalVolunteer, setAnimalVolunteer] = useState([]);
  const [comments, setComments] = useState([]);
  const [organization, setOrganization] = useState(new Shelter());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.get_user_info();
        setIsLoggedIn(!!response);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const openEditModal = (article) => {
    setSelectedArticle({ ...article });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const saveChanges = async () => {
    try {
      const articleService = new Article_service();

      // Get current user ID
      const currentUserId = get_user_id();

      // Prepare updated article data
      const updatedArticle = {
        article_id: selectedArticle.article_id,
        photo_url: selectedArticle.photo_url,
        name: selectedArticle.name,
        age: selectedArticle.age,
        sex: selectedArticle.sex,
        health_status: selectedArticle.health_status,
        animal_type: selectedArticle.animal_type,
        description: selectedArticle.description,
        shelter_id: organization.id,
        volunteer_id: selectedArticle.volunteer_id || currentUserId,
      };

      await articleService.edit_article(updatedArticle);

      setAnimal((prev) =>
        prev.map((article) =>
          article.article_id === updatedArticle.article_id
            ? updatedArticle
            : article
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOrganizationInfo = async () => {
      try {
        const response = await authService.get_user_info();
        if (response && response.data) {
          const shelterData = Shelter.fromJSON(response.data);
          setOrganization(shelterData);

          const articleService = new Article_service();

          const shelterArticles = await articleService.fetch_article(
            shelterData.id
          );
          console.log("Articles from server (shelter):", shelterArticles);
          setAnimal(shelterArticles);

          const volunteerArticles = await articleService.fetch_article(
            get_user_id()
          );
          console.log("Articles from server (volunteer):", volunteerArticles);
          setAnimalVolunteer(volunteerArticles);

          const shelterComments = await CommentService.get_comments(
            shelterData.id
          );
          console.log("Comments from server:", shelterComments);
          setComments(shelterComments);
        } else {
          console.warn("No organization data found.");
        }
      } catch (error) {
        console.error("Error fetching organization info or articles:", error);
      }
    };

    fetchOrganizationInfo();
  }, []);

  return (
    <div className="cabinetBodyContainer">
      <div className="cabinetHeader">
        <h1 onClick={() => navigate("/")}>Life4Paw</h1>
        <div className="headerBtnContainer">
          <div
            className="login"
            onClick={() =>
              navigate(isLoggedIn ? "/OrganizationCabinet" : "/LoginSignUp")
            }
          >
            <h1>{isLoggedIn ? "Кабінет" : "Увійти"}</h1>
          </div>
          <div className="find" onClick={() => navigate("/ArticleForm")}>
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
            <h1>{organization.name}</h1>
          </div>
          <div className="organizationCategory">
            <h1>Категорія: {organization.shelter_category}</h1>
          </div>
          <div className="organizationAddress">
            <h1>Адреса: {organization.address}</h1>
          </div>
        </div>
      </div>
      <div className="organizationArticlesBody">
        <div className="activeArticles">
          <h1>Активні оголошення: </h1>
        </div>
        <div className="articleCards">
          {animal.map((article) => (
            <div className="animalCard" key={animal.article_id}>
              <div className="animalImage">
                <img
                  src={article.photo_url || animalImage}
                  alt={article.name}
                  className="animalPhoto"
                  onError={(e) => {
                    console.log("Failed to load image:", article.photo_url);
                    e.target.src = animalImage;
                  }}
                  crossOrigin="anonymous"
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
                {organization.name}
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
          {animalVolunteer.map((article) => (
            <div className="animalCard" key={article.article_id}>
              <div className="animalImage">
                <img
                  src={article.photo_url || animalImage}
                  alt={article.name}
                  className="animalPhoto"
                  onError={(e) => {
                    console.log("Failed to load image:", article.photo_url);
                    e.target.src = animalImage;
                  }}
                  crossOrigin="anonymous"
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
              <p className="commentText">{comment.description}</p>
              <p className="commentAuthor">Автор: {comment.volunteer_id}</p>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Редагування</h2>
            <div className="modalBody">
              <label>
                Посилання на фото:
                <input
                  type="text"
                  value={selectedArticle.photo_url}
                  onChange={(e) =>
                    setSelectedArticle({
                      ...selectedArticle,
                      photo_url: e.target.value,
                    })
                  }
                />
              </label>
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
                        selectedArticle.animal_type === "dogs" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedArticle({
                          ...selectedArticle,
                          animal_type: "dogs",
                        })
                      }
                    >
                      <img src={dogImage}></img>Пес
                    </button>
                    <button
                      className={`typeButton ${
                        selectedArticle.animal_type === "cats" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedArticle({
                          ...selectedArticle,
                          animal_type: "cats",
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

import React, { useState, useEffect } from "react";
import "./OrganizationPage.css";
import PetCardModal from "../../components/PetModal/PetCardModal";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";

import shelterImage from "../../assets/images/animal-shelter.png";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import animalImage from "../../assets/images/Pipa.jpg";
import handsImage from "../../assets/images/hands.png";

import Comment from "../../models/comments_model";

const OrganizationPage = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [animal, setAnimal] = useState([
    {
      id: 1,
      name: "Піпа",
      age: 1,
      ageUnit: "місяць",
      sex: "Хлопчик",
      image: animalImage,
      organization: "GladPet",
      description:
        "Піпа - дуже енергійний та веселий котик. Обожнює гратися та швидко знаходить спільну мову з дітьми. Дуже хоче знайти люблячу родину.",
      healthStatus: "Здоровий",
      type: "cat",
    },
    {
      id: 1,
      name: "Піпа",
      age: 1,
      ageUnit: "місяць",
      sex: "Хлопчик",
      image: animalImage,
      organization: "GladPet",
      description:
        "Піпа - дуже енергійний та веселий котик. Обожнює гратися та швидко знаходить спільну мову з дітьми. Дуже хоче знайти люблячу родину.",
      healthStatus: "Здоровий",
      type: "cat",
    },
    {
      id: 1,
      name: "Піпа",
      age: 1,
      ageUnit: "місяць",
      sex: "Хлопчик",
      image: animalImage,
      organization: "GladPet",
      description:
        "Піпа - дуже енергійний та веселий котик. Обожнює гратися та швидко знаходить спільну мову з дітьми. Дуже хоче знайти люблячу родину.",
      healthStatus: "Здоровий",
      type: "cat",
    },
  ]);

  const [comments, setComments] = useState([]);

  const openPetModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closePetModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

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
          {animal.map((pet) => (
            <div
              className="animalCardPage"
              key={pet.id}
              onClick={() => openPetModal(pet)}
            >
              <div className="animalImagePage">
                <img src={pet.image} alt={pet.name} className="animalPhoto" />
              </div>
              <h2 className="animalNamePage">{pet.name}</h2>
              <div className="description">
                <h1 className="animalAge">
                  <img src={ageImage} alt="Age" />
                  Вік: {pet.age} {pet.ageUnit}
                </h1>
                <h1 className="animalGender">
                  <img src={genderImage} alt="Gender" />
                  {pet.sex}
                </h1>
              </div>
              <div className="organizationCardName">
                <img src={handsImage} alt="Organization" />
                {pet.organization}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pet Modal */}
      <PetCardModal
        isOpen={isModalOpen}
        onClose={closePetModal}
        pet={selectedPet}
      />

      <div className="organizationCommentsBody">
        <div className="commentsText">
          <h1>Коментарі:</h1>
        </div>
        <div className="commentsCards">
          {comments.length > 0 ? (
            comments.map((comment) => (
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
                тварин, які там живуть.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;

import React, { useState } from "react";
import "./OrganizationCabinet.css";
import shelterImage from "../../assets/images/animal-shelter.png";
import editImage from "../../assets/images/edit.png";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import animalImage from "../../assets/images/image.png";
import handsImage from "../../assets/images/hands.png";

import { useNavigate } from "react-router-dom";

const OrganizationCabinet = () => {
  const [animal, setAnimal] = useState([
    {
      id: 1,
      name: "Барсик",
      age: 3,
      sex: "Чоловіча",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 2,
      name: "Мурка",
      age: 2,
      sex: "Жіноча",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 3,
      name: "Рекс",
      age: 5,
      sex: "Чоловіча",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 4,
      name: "Белла",
      age: 1,
      sex: "Жіноча",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
    {
      id: 5,
      name: "Шарік",
      age: 4,
      sex: "Чоловіча",
      image: animalImage,
      organization: "Animal Shelter",
      edit: "",
      delete: "",
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Олександр",
      text: "Дуже гарна організація! Допомогли знайти собаку.",
      rating: 5,
    },
    {
      id: 2,
      name: "Марія",
      text: "Все добре, але хотілося б більше інформації про тварин.",
      rating: 4,
    },
    {
      id: 3,
      name: "Іван",
      text: "Не зміг додзвонитися, але сайт зручний.",
      rating: 3,
    },
    {
      id: 4,
      name: "Іван",
      text: "Зміг додзвонитися, але Даня аутіст.",
      rating: 5,
    },
  ]);

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
          {animal.map((animal) => (
            <div className="animalCard" key={animal.id}>
              <div className="animalImage">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="animalPhoto"
                />
              </div>
              <h2 className="animalName">{animal.name}</h2>
              <div className="description">
                <h1 className="animalAge">
                  <img src={ageImage}></img>Вік: {animal.age}
                </h1>
                <h1 className="animalGender">
                  <img src={genderImage}></img>
                  {animal.sex}
                </h1>
              </div>
              <div className="organizationCardName">
                <img src={handsImage}></img>
                {animal.organization}
              </div>
              <div className="cardOptions">
                <button className="editCard">
                  <img src={editImage}></img>
                  {animal.edit}
                </button>
                <button className="deleteCard">Х{animal.delete}</button>
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
          {animal.map((animal) => (
            <div className="animalCard" key={animal.id}>
              <div className="animalImage">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="animalPhoto"
                />
              </div>
              <h2 className="animalName">{animal.name}</h2>
              <div className="description">
                <h1 className="animalAge">
                  <img src={ageImage}></img>Вік: {animal.age}
                </h1>
                <h1 className="animalGender">
                  <img src={genderImage}></img>
                  {animal.sex}
                </h1>
              </div>
              <div className="organizationCardName">
                <img src={handsImage}></img>
                {animal.organization}
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
            <div className="commentCard" key={comment.id}>
              <h2 className="commentName">{comment.name}</h2>
              <p className="commentText">{comment.text}</p>
              <p className="commentRating">Оцінка: {comment.rating}/5</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationCabinet;

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
import UserModels from "../../models/user_model";
import Article_service from "../../services/article_service";
import CommentService from "../../services/comment_service";

import Comment from "../../models/comments_model";

const { Shelter } = UserModels;

const OrganizationPage = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organization, setOrganization] = useState(new Shelter());
  const [animal, setAnimal] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const openPetModal = (animal) => {
    console.log("Selected pet:", animal);
    setSelectedPet(animal);
    setIsModalOpen(true);
  };

  const closePetModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
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
          setAnimal(shelterArticles);

          const shelterComments = await CommentService.get_comments(
            shelterData.id
          );
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
          <div className="find" onClick={() => navigate("/ArticleForm")}>
            <h1>Знайшли тварину?</h1>
          </div>
        </div>
      </div>

      <div className="organizationInfoPage">
        <div className="organizationPhotoPage">
          <img src={shelterImage} className="photo-img" alt="Shelter" />
        </div>
        <div className="organizationContactsPage">
          <div className="organizationNamePage">
            <h1>{organization.name}</h1>
          </div>
          <div className="organizationCategoryPage">
            <h1>Категорія: {organization.shelter_category}</h1>
          </div>
          <div className="organizationAddressPage">
            <h1>Адреса: {organization.address}</h1>
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
        <div className="activeArticlesPage">
          <h1>Активні оголошення: </h1>
        </div>
        <div className="articleCardsPage">
          {animal.map((animal) => (
            <div
              className="animalCardPage"
              key={animal.id}
              onClick={() => openPetModal(animal)}
            >
              <div className="animalImagePage">
                <img
                  src={animal.photo_url || animalImage}
                  alt={animal.name}
                  className="animalPhoto"
                />
              </div>
              <h2 className="animalNamePage">{animal.name}</h2>
              <div className="descriptionPage">
                <h1 className="animalAgePage">
                  <img src={ageImage} alt="Age" />
                  Вік: {animal.age} {animal.ageUnit}
                </h1>
                <h1 className="animalGenderPage">
                  <img src={genderImage} alt="Gender" />
                  {animal.sex}
                </h1>
              </div>
              <div className="organizationCardNamePage">
                <img src={handsImage} alt="Organization" />
                {organization.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pet Modal */}
      <PetCardModal
        isOpen={isModalOpen}
        onClose={closePetModal}
        animal={selectedPet}
        authorName={organization.name}
      />

      <div className="organizationCommentsBody">
        <div className="commentsText">
          <h1>Коментарі:</h1>
        </div>
        <div className="commentsCards">
          {comments.map((comment) => (
            <div className="commentCard" key={comment.comment_id}>
              <p className="commentText">{comment.description}</p>
              <p className="commentAuthor">Автор: {comment.volunteer_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;

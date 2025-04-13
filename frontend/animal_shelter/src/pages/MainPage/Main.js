import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import "./Main.css";
=======
import "./Main.css";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import PetCardModal from "../../components/PetModal/PetCardModal";
>>>>>>> 9ef17596c0584799ebffc2802fa78ac04fe00853

import pipaDog from "../../assets/images/Pipa.jpg";
import ameliaCat from "../../assets/images/Amelia.jpg";
import layaCat from "../../assets/images/Laya.jpg";
import siriusLogo from "../../assets/images/sirius.jpg";
import gladpetLogo from "../../assets/images/gladpet.jpg";
import lkplevLogo from "../../assets/images/lkplev.jpg";
import happypawLogo from "../../assets/images/happypaw.jpg";

import ageIcon from "../../assets/images/age.png";
import catIcon from "../../assets/images/cat.png";
import dogIcon from "../../assets/images/dog.png";
import genderIcon from "../../assets/images/gender.png";
import handsIcon from "../../assets/images/hands.png";
import Article from "../../models/article_model";
import Article_service from "../../services/article_service";
import { set_user_type, get_user_id, get_user_type } from "../../services/cache";

// Import services
import Article_service from "../../services/article_service";
const article_service = new Article_service();

export default function Life4PawApp() {
<<<<<<< HEAD
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

=======
  const [scrollY, setScrollY] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user_id=get_user_id()
    if(user_id){
      setIsLoggedIn(true);
      setUserType(get_user_type());
    }else{
      setIsLoggedIn(false);
      setUserType(get_user_type());
    }

  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const article_service = new Article_service();
        const fetchedData = await article_service.fetch_article_homepage();
        console.log("Fetched data:", fetchedData);
        setPets(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

>>>>>>> 9ef17596c0584799ebffc2802fa78ac04fe00853
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedData = await article_service.fetch_article_homepage();
        console.log("Articles from server:", fetchedData);

        if (fetchedData && Array.isArray(fetchedData)) {
          setPets(fetchedData);
        } else {
          setPets([]);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load pets");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const scrollToAnnouncements = (e) => {
    e.preventDefault();
    const announcements = document.querySelector(".announcements-section");
    if (announcements) {
      announcements.scrollIntoView({ behavior: "smooth" });
    }
  };

<<<<<<< HEAD
=======
  // Function to safely get shelter/volunteer information
  const getShelterVolunteerInfo = (petData) => {
    if (!petData) return "Unknown";

    const pet = petData;
    const authorName = pet.author_name || "Unknown Author";

    return authorName;
  };

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setIsModalOpen(false);
  };

  const handleCabinetClick = () => {
    if (isLoggedIn) {
      if (userType === "volunteer") {
        navigate("/VolunteerCabinet");
      } else if (userType === "shelter") {
        navigate("/OrganizationCabinet");
      }
    } else {
      navigate("/LoginSignUp"); // Redirect to login if not logged in
    }
  };

>>>>>>> 9ef17596c0584799ebffc2802fa78ac04fe00853
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="site-title">Life4Paw</h1>
        <nav className="main-nav">
          <span
            className="nav-item"
            onClick={handleCabinetClick} // Use the handleCabinetClick function here
          >
            <h1>{isLoggedIn ? "Кабінет" : "Увійти"}</h1>
          </span>
          <button className="find" onClick={() => navigate("/ArticleForm")}>
            <h1>Знайшли тварину?</h1>
          </button>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-text">
            Life4Paw - це сайт, де притулки викладають анкети тварин, а люди
            шукають собі улюбленця або можуть допомогти.
          </p>
          <a
            href="#"
            className="find-friend-button"
            onClick={scrollToAnnouncements}
          >
            Знайти друга
          </a>
        </div>
      </section>

      <section className="choose-friend-section">
        <div className="section-container">
          <h2 className="section-title">Обери свого друга!</h2>
          <div className="pet-options">
            <div className="pet-option">
<<<<<<< HEAD
              <img src={dogIcon} alt="Dog" className="icon-image" />
              <p>Песик</p>
            </div>
            <div className="pet-option">
              <img src={catIcon} alt="Cat" className="icon-image" />
              <p>Котик</p>
=======
              <div
                className="pet-icon dog-icon"
                onClick={() => navigate("/Search")}
              >
                <img src={dogIcon} alt="Dog icon" className="icon-image" />
              </div>
              <p className="pet-type">Песик</p>
            </div>
            <div className="pet-option">
              <div
                className="pet-icon cat-icon"
                onClick={() => navigate("/Search")}
              >
                <img
                  src={catIcon}
                  alt="Cat icon"
                  className="icon-image cat-image"
                />
              </div>
              <p className="pet-type">Котик</p>
>>>>>>> 9ef17596c0584799ebffc2802fa78ac04fe00853
            </div>
          </div>
        </div>
      </section>

      <section className="announcements-section">
        <h2 className="section-title">Оголошення</h2>
<<<<<<< HEAD
        {loading ? (
          <div className="loading-message">Завантаження...</div>
        ) : error ? (
          <div class="error-message">{error}</div>
        ) : (
          <div className="pets-grid">
            {pets.map((pet) => (
              <div className="pet-card" key={pet.article_id}>
                <div className="pet-image">
                  <img
                    src={pet.photo_url || pipaDog}
                    alt={pet.name}
                    className="pet-photo"
                    onError={(e) => {
                      e.target.src = pipaDog;
                    }}
                  />
                </div>
                <div className="pet-info">
                  <h3 className="pet-name">{pet.name}</h3>
                  <div className="pet-details">
                    <div className="detail-item">
                      <img src={ageIcon} alt="Age" className="detail-icon" />
                      <span>
                        Вік: {pet.age} {pet.age_unit || "років"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <img
                        src={genderIcon}
                        alt="Gender"
                        className="detail-icon"
                      />
                      <span>{pet.sex}</span>
                    </div>
                    <div className="detail-item">
                      <img
                        src={handsIcon}
                        alt="Organization"
                        className="detail-icon"
                      />
                      <span>
                        {pet.shelter_name ||
                          pet.volunteer_name ||
                          "Невідомий притулок"}
=======

        {loading ? (
          <div className="loading-message">Loading pets...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : pets && pets.length > 0 ? (
          <div className="pets-grid">
            {pets.map((petData) => (
              <div
                className="pet-card"
                key={petData.article_id || `pet-${Math.random()}`}
                onClick={() => openModal(petData)}
              >
                <div className="pet-image">
                  {petData.photo_url && (
                    <img src={petData.photo_url} alt={petData.name || "Pet"} />
                  )}
                </div>
                <div className="pet-info">
                  <h3 className="pet-name">{petData.name || "Unnamed Pet"}</h3>
                  <div className="pet-details">
                    <div className="detail-item">
                      <span className="detail-icon">
                        <img
                          src={ageIcon}
                          alt="Age"
                          className="detail-icon-image"
                        />
                      </span>
                      <span className="detail-text">
                        {petData.age || "Unknown"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">
                        <img
                          src={genderIcon}
                          alt="Gender"
                          className="detail-icon-image"
                        />
                      </span>
                      <span className="detail-text">
                        {petData.sex || "Unknown"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">
                        <img
                          src={handsIcon}
                          alt="Author"
                          className="detail-icon-image"
                        />
                      </span>
                      <span className="detail-text">
                        {getShelterVolunteerInfo(petData)}
>>>>>>> 9ef17596c0584799ebffc2802fa78ac04fe00853
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD
        )}
      </section>

      <section className="shelters-section">
        <h2 className="section-title">Притулки для тварин!</h2>
        <div className="shelters-grid">
          {[
            {
              name: "Сіріус",
              logo: siriusLogo,
              url: "https://dogcat.com.ua/",
              location: "м.Київ",
              year: "2000",
            },
            {
              name: "GladPet",
              logo: gladpetLogo,
              url: "https://gladpet.org/",
              location: "Вся Україна",
              year: "2015",
            },
            {
              name: "LKP LEV",
              logo: lkplevLogo,
              url: "https://lkplev.com/",
              location: "м.Львів",
              year: "2003",
            },
            {
              name: "Happy Paw",
              logo: happypawLogo,
              url: "https://happypaw.ua/",
              location: "Вся Україна",
              year: "2012",
            },
          ].map((shelter) => (
            <div className="shelter-card" key={shelter.name}>
              <div className="shelter-logo">
                <img src={shelter.logo} alt={shelter.name} />
              </div>
              <a
                href={shelter.url}
                className="shelter-name"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shelter.name}
              </a>
              <p className="shelter-address">
                {shelter.location}
                <br />
                Рік заснування: {shelter.year}
              </p>
            </div>
          ))}
        </div>
      </section>

=======
        ) : (
          <div className="no-pets-message">No pets available at the moment</div>
        )}
      </section>

      {/* Pet Modal */}
      {isModalOpen && selectedPet && (
        <PetCardModal
          isOpen={isModalOpen}
          onClose={closeModal}
          animal={selectedPet}
          authorName={getShelterVolunteerInfo(selectedPet)} // Передаємо authorName
        />
      )}

      {/* Shelters Section */}
      <section className="shelters-section">
        <h2 className="section-title">Притулки для тварин!</h2>
        <div className="shelters-grid">
          <div className="shelter-card">
            <div className="shelter-logo">
              <img src={siriusLogo} alt="Сіріус" />
            </div>
            <a
              className="shelter-name"
              href="https://dogcat.com.ua/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Сіріус
            </a>
            <p className="shelter-address">
              м.Київ <br />
              Рік заснування: 2000
            </p>
          </div>

          <div className="shelter-card">
            <div className="shelter-logo">
              <img src={gladpetLogo} alt="GladPet" />
            </div>
            <a
              className="shelter-name"
              href="https://gladpet.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GladPet
            </a>
            <p className="shelter-address">
              Вся Україна <br />
              Рік Заснування: 2015
            </p>
          </div>

          <div className="shelter-card">
            <div className="shelter-logo">
              <img src={lkplevLogo} alt="LKP LEV" />
            </div>
            <a
              className="shelter-name"
              href="https://lkplev.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LKP LEV
            </a>
            <p className="shelter-address">
              м.Львів <br />
              Рік Заснування: 2003
            </p>
          </div>

          <div className="shelter-card">
            <div className="shelter-logo">
              <img src={happypawLogo} alt="Happy Paw" />
            </div>
            <a
              className="shelter-name"
              href="https://happypaw.ua/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Happy Paw
            </a>
            <p className="shelter-address">
              Вся Україна <br />
              Рік Заснування: 2012
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
>>>>>>> 9ef17596c0584799ebffc2802fa78ac04fe00853
      <footer className="footer">
        <p>© 2025 Life4Paw. Всі права захищені.</p>
      </footer>
    </div>
  );
}

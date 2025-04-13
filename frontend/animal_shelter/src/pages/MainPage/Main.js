import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

// Import pet and shelter images
import pipaDog from "../../assets/images/Pipa.jpg";
import ameliaCat from "../../assets/images/Amelia.jpg";
import layaCat from "../../assets/images/Laya.jpg";
import siriusLogo from "../../assets/images/sirius.jpg";
import gladpetLogo from "../../assets/images/gladpet.jpg";
import lkplevLogo from "../../assets/images/lkplev.jpg";
import happypawLogo from "../../assets/images/happypaw.jpg";

// Import icons
import ageIcon from "../../assets/images/age.png";
import catIcon from "../../assets/images/cat.png";
import dogIcon from "../../assets/images/dog.png";
import genderIcon from "../../assets/images/gender.png";
import handsIcon from "../../assets/images/hands.png";

// Import services
import Article_service from "../../services/article_service";
const article_service = new Article_service();

export default function Life4PawApp() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="site-title">Life4Paw</h1>
        <nav className="main-nav">
          <span className="nav-item" onClick={() => navigate("/LoginSignUp")}>
            <h1>Увійти</h1>
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
              <img src={dogIcon} alt="Dog" className="icon-image" />
              <p>Песик</p>
            </div>
            <div className="pet-option">
              <img src={catIcon} alt="Cat" className="icon-image" />
              <p>Котик</p>
            </div>
          </div>
        </div>
      </section>

      <section className="announcements-section">
        <h2 className="section-title">Оголошення</h2>
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
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      <footer className="footer">
        <p>© 2025 Life4Paw. Всі права захищені.</p>
      </footer>
    </div>
  );
}

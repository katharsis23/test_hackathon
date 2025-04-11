import React, { useState, useEffect } from "react";
import "./main.css";

// Import pet and shelter images
import pipaDog from "../assets/images/Pipa.jpg";
import ameliaCat from "../assets/images/Amelia.jpg";
import layaCat from "../assets/images/Laya.jpg";
import siriusLogo from "../assets/images/sirius.jpg";
import gladpetLogo from "../assets/images/gladpet.jpg";
import lkplevLogo from "../assets/images/lkplev.jpg";
import happypawLogo from "../assets/images/happypaw.jpg";

// Import icons
import ageIcon from "../assets/images/age.png";
import catIcon from "../assets/images/cat.png";
import dogIcon from "../assets/images/dog.png";
import genderIcon from "../assets/images/gender.png";
import handsIcon from "../assets/images/hands.png";

export default function Life4PawApp() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate hero section effects based on scroll position
  const heroOpacity = Math.max(1 - scrollY / 300, 0); // Fade out completely

  const scrollToAnnouncements = (e) => {
    e.preventDefault();
    const announcements = document.querySelector(".announcements-section");
    if (announcements) {
      announcements.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="site-title">Life4Paw</h1>
        <nav className="main-nav">
          <span className="nav-item">coming_soon</span>
          <span className="nav-item">coming_soon</span>
          <span className="nav-item">coming_soon</span>
          <span className="nav-item">Увійти</span>
          <button className="cta-button">Знайшли тварину?</button>
        </nav>
        <button className="mobile-menu-button">Menu</button>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text-container">
            <p className="hero-text">
              Life4Paw - це сайт, де притулки викладають анкети тварин, а люди
              шукають собі улюбленця або можуть допомогти. Тут можна забрати
              кота чи собаку, стати волонтером або просто підтримати притулки.
              Все просто — зайшов, обрав, допоміг. Без зайвих складнощів.
            </p>
            <a
              href="#"
              className="find-friend-button"
              onClick={scrollToAnnouncements}
            >
              Знайти друга
            </a>
          </div>
        </div>
      </section>

      {/* Choose Your Friend Section */}
      <section id="find-friend" className="choose-friend-section">
        <div className="section-container">
          <h2 className="section-title">Обери свого друга!</h2>
          <div className="pet-options">
            <div className="pet-option">
              <div className="pet-icon dog-icon">
                <img src={dogIcon} alt="Dog icon" className="icon-image" />
              </div>
              <p className="pet-type">Песик</p>
            </div>
            <div className="pet-option">
              <div className="pet-icon cat-icon">
                <img
                  src={catIcon}
                  alt="Cat icon"
                  className="icon-image cat-image"
                />
              </div>
              <p className="pet-type">Котик</p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="announcements-section">
        <h2 className="section-title">Оголошення</h2>
        <div className="pets-grid">
          <div className="pet-card">
            <div className="pet-image">
              <img src={pipaDog} alt="Піпа" />
            </div>
            <div className="pet-info">
              <h3 className="pet-name">Піпа</h3>
              <div className="pet-details">
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={ageIcon}
                      alt="Age"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">1 місяць</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={genderIcon}
                      alt="Gender"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">Хлопчик</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={handsIcon}
                      alt="Shelter"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">Притулок GladPet</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pet-card">
            <div className="pet-image">
              <img src={ameliaCat} alt="Біг босс" />
            </div>
            <div className="pet-info">
              <h3 className="pet-name">Амелія</h3>
              <div className="pet-details">
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={ageIcon}
                      alt="Age"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">4 роки</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={genderIcon}
                      alt="Gender"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">Дівчинка</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={handsIcon}
                      alt="Shelter"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">Притулок Sirius</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pet-card">
            <div className="pet-image">
              <img src={layaCat} alt="Laya" />
            </div>
            <div className="pet-info">
              <h3 className="pet-name">Лайа</h3>
              <div className="pet-details">
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={ageIcon}
                      alt="Age"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">6 місяців</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={genderIcon}
                      alt="Gender"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">Дівчинка</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <img
                      src={handsIcon}
                      alt="Shelter"
                      className="detail-icon-image"
                    />
                  </span>
                  <span className="detail-text">Волонтер: Іван</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <footer className="footer">
        <p className="footer-text">
          Для того аби футер зявився , даня має зробити мінєт боді
        </p>
      </footer>
    </div>
  );
}

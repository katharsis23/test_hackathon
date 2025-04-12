import React, { useState, useEffect } from "react";
import "./Main.css";
import PetCardModal from "../../components/PetModal/PetCardModal";

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

export default function Life4PawApp() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pet data
  const pets = [
    {
      id: 1,
      name: "Піпа",
      age: 1,
      ageUnit: "місяць",
      sex: "Хлопчик",
      image: pipaDog,
      organization: "GladPet",
      description:
        "Піпа - дуже енергійний та веселий котик. Обожнює гратися та швидко знаходить спільну мову з дітьми. Дуже хоче знайти люблячу родину.",
      healthStatus: "Здоровий",
      type: "dog",
    },
    {
      id: 2,
      name: "Амелія",
      age: 4,
      ageUnit: "роки",
      sex: "Дівчинка",
      image: ameliaCat,
      organization: "Sirius",
      description:
        "Ласкава та спокійна кішечка, яка насолоджується спокійним життям. Любить сидіти на підвіконні та спостерігати за птахами. Прекрасно ладить з іншими тваринами.",
      healthStatus: "Здорова",
      type: "cat",
    },
    {
      id: 3,
      name: "Лайа",
      age: 6,
      ageUnit: "місяців",
      sex: "Дівчинка",
      image: layaCat,
      organization: "Волонтер: Іван",
      description:
        "Лайа - грайлива собачка з дуже приємним характером. Любить гратися з м'ячиками та іншими іграшками. Шукає дім, де її будуть любити та піклуватися.",
      healthStatus: "Хворенька",
      type: "cat",
    },
  ];

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

  // Functions to handle the pet modal
  const openPetModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closePetModal = () => {
    setIsModalOpen(false);
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
          {pets.map((pet) => (
            <div
              className="pet-card"
              key={pet.id}
              onClick={() => openPetModal(pet)}
            >
              <div className="pet-image">
                <img src={pet.image} alt={pet.name} />
              </div>
              <div className="pet-info">
                <h3 className="pet-name">{pet.name}</h3>
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
                      {pet.age} {pet.ageUnit}
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
                    <span className="detail-text">{pet.sex}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">
                      <img
                        src={handsIcon}
                        alt="Shelter"
                        className="detail-icon-image"
                      />
                    </span>
                    <span className="detail-text">{pet.organization}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
        <p className="footer-text">© 2025 Life4Paw. Всі права захищені.</p>
      </footer>

      {/* Pet Modal */}
      <PetCardModal
        isOpen={isModalOpen}
        onClose={closePetModal}
        pet={selectedPet}
      />
    </div>
  );
}

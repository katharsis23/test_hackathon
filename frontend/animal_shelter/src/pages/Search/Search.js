import React, { useState, useEffect } from "react";
import "./Search.css";
// Імпорти зображень
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import animalImage from "../../assets/images/image.png";
import handsImage from "../../assets/images/hands.png";
import catImage from "../../assets/images/cat.png";
import dogImage from "../../assets/images/dog.png";
import logoImage from "../../assets/images/animal-shelter.png";
import PetCardModal from "../../components/PetModal/PetCardModal";

function Search() {
  const mockAnimals = [
    {
      article_id: 1,
      name: "Барсік",
      animal_type: "Кіт",
      sex: "Хлопчик",
      age: 2.5,
      health_status: "Здоровий",
      shelter_id: "Щасливий хвіст",
      photo_url:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300",
    },
    {
      article_id: 2,
      name: "Рекс",
      animal_type: "Пес",
      sex: "Хлопчик",
      age: 3,
      health_status: "Здоровий",
      shelter_id: "Дім для друга",
      photo_url:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300",
    },
    {
      article_id: 3,
      name: "Мурка",
      animal_type: "Кіт",
      sex: "Дівчинка",
      age: 0.8,
      health_status: "Потребує лікування",
      shelter_id: "Кіт і Кіт",
      photo_url:
        "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=300",
    },
    {
      article_id: 4,
      name: "Шарік",
      animal_type: "Пес",
      sex: "Хлопчик",
      age: 6,
      health_status: "З особливостями",
      shelter_id: "Щасливий хвіст",
      photo_url:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=300",
    },
    {
      article_id: 5,
      name: "Ліза",
      animal_type: "Кіт",
      sex: "Дівчинка",
      age: 1.5,
      health_status: "Здоровий",
      shelter_id: "Кіт і Кіт",
      photo_url:
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=300",
    },
    {
      article_id: 7,
      name: "Стрілка",
      animal_type: "Пес",
      sex: "Дівчинка",
      age: 4,
      health_status: "З особливостями",
      shelter_id: "Щасливий хвіст",
      photo_url:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300",
    },
    {
      article_id: 8,
      name: "Сімба",
      animal_type: "Кіт",
      sex: "Хлопчик",
      age: 1,
      health_status: "Здоровий",
      shelter_id: "Кіт і Кіт",
      photo_url:
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=300",
    },
  ];

  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    gender: "all",
    age: "all",
    health: "all",
  });
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Замість fetchAnimals() використовуємо mockAnimals
    setAnimals(mockAnimals);
    setFilteredAnimals(mockAnimals);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, animals]);

  const applyFilters = () => {
    let result = [...animals];

    if (filters.type !== "all") {
      result = result.filter((animal) => animal.animal_type === filters.type);
    }

    if (filters.gender !== "all") {
      result = result.filter((animal) => animal.sex === filters.gender);
    }

    if (filters.age !== "all") {
      result = result.filter((animal) => {
        if (filters.age === "young" && animal.age < 1) return true;
        if (filters.age === "adult" && animal.age >= 1 && animal.age <= 2)
          return true;
        if (filters.age === "senior" && animal.age > 2 && animal.age <= 5)
          return true;
        if (filters.age === "elder" && animal.age > 5) return true;
        return false;
      });
    }

    if (filters.health !== "all") {
      result = result.filter(
        (animal) => animal.health_status === filters.health
      );
    }

    setFilteredAnimals(result);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const openModal = (animal) => {
    console.log("Modal open triggered", animal);
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnimal(null);
  };

  function FilterSection({ filters, onFilterChange }) {
    return (
      <div className="filters">
        <div className="filter-group">
          <button
            className={`filter-btn ${filters.type === "all" ? "active" : ""}`}
            onClick={() => onFilterChange("type", "all")}
          >
            <span className="filter-icon">
              <img src={logoImage} alt="All animals" />
            </span>
            Усі тварини
          </button>

          <button
            className={`filter-btn ${filters.type === "Пес" ? "active" : ""}`}
            onClick={() => onFilterChange("type", "Пес")}
          >
            <span className="filter-icon">
              <img src={dogImage} alt="Dogs" />
            </span>
            Песики
          </button>

          <button
            className={`filter-btn ${filters.type === "Кіт" ? "active" : ""}`}
            onClick={() => onFilterChange("type", "Кіт")}
          >
            <span className="filter-icon">
              <img src={catImage} alt="Cats" />
            </span>
            Котики
          </button>
        </div>

        <div className="filter-group">
          <h3 className="filter-title">Стать</h3>
          <div className="filter-options">
            <button
              className={`filter-tag ${
                filters.gender === "all" ? "active" : ""
              }`}
              onClick={() => onFilterChange("gender", "all")}
            >
              Усі
            </button>
            <button
              className={`filter-tag ${
                filters.gender === "Хлопчик" ? "active" : ""
              }`}
              onClick={() => onFilterChange("gender", "Хлопчик")}
            >
              Хлопчик
            </button>
            <button
              className={`filter-tag ${
                filters.gender === "Дівчинка" ? "active" : ""
              }`}
              onClick={() => onFilterChange("gender", "Дівчинка")}
            >
              Дівчинка
            </button>
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-title">Вік</h3>
          <div className="filter-options">
            <button
              className={`filter-tag ${filters.age === "all" ? "active" : ""}`}
              onClick={() => onFilterChange("age", "all")}
            >
              Усі
            </button>
            <button
              className={`filter-tag ${
                filters.age === "young" ? "active" : ""
              }`}
              onClick={() => onFilterChange("age", "young")}
            >
              До 1р
            </button>
            <button
              className={`filter-tag ${
                filters.age === "adult" ? "active" : ""
              }`}
              onClick={() => onFilterChange("age", "adult")}
            >
              1-2р
            </button>
            <button
              className={`filter-tag ${
                filters.age === "senior" ? "active" : ""
              }`}
              onClick={() => onFilterChange("age", "senior")}
            >
              2-5р
            </button>
            <button
              className={`filter-tag ${
                filters.age === "elder" ? "active" : ""
              }`}
              onClick={() => onFilterChange("age", "elder")}
            >
              старше 5р
            </button>
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-title">Здоров'я</h3>
          <div className="filter-options">
            <button
              className={`filter-tag ${
                filters.health === "all" ? "active" : ""
              }`}
              onClick={() => onFilterChange("health", "all")}
            >
              Усі
            </button>
            <button
              className={`filter-tag ${
                filters.health === "З особливостями" ? "active" : ""
              }`}
              onClick={() => onFilterChange("health", "З особливостями")}
            >
              З особливостями
            </button>
            <button
              className={`filter-tag ${
                filters.health === "Потребує лікування" ? "active" : ""
              }`}
              onClick={() => onFilterChange("health", "Потребує лікування")}
            >
              Потребує лікування
            </button>
            <button
              className={`filter-tag ${
                filters.health === "Здоровий" ? "active" : ""
              }`}
              onClick={() => onFilterChange("health", "Здоровий")}
            >
              Здоровий
            </button>
          </div>
        </div>
      </div>
    );
  }

  function AnimalCard({ animal, isFavorite, onFavoriteToggle, onCardClick }) {
    return (
      <div className="animalCard" onClick={() => onCardClick(animal)}>
        <div className="animalImage">
          <img
            src={animal.photo_url || animalImage}
            alt={animal.name}
            className="animalPhoto"
          />
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(animal.article_id);
            }}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
        <h2 className="animalName">{animal.name}</h2>
        <div className="description">
          <h1 className="animalAge">
            <img src={ageImage} alt="Age" /> Вік: {animal.age}
          </h1>
          <h1 className="animalGender">
            <img src={genderImage} alt="Gender" />
            {animal.sex}
          </h1>
        </div>
        <div className="organizationCardName">
          <img src={handsImage} alt="Organization" />
          {animal.shelter_id}
        </div>
      </div>
    );
  }

  return (
    <div className="SearchPage">
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
      <div className="main">
        <div className="page-title">
          <h1>Обери, кому подаруєш дім</h1>
        </div>

        <div className="content-wrapper">
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <div className="animals-grid">
            {filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.article_id}
                animal={animal}
                isFavorite={favorites.includes(animal.article_id)}
                onFavoriteToggle={toggleFavorite}
                onCardClick={openModal}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedAnimal && (
        <PetCardModal animal={selectedAnimal} onClose={closeModal} />
      )}
    </div>
  );
}

export default Search;

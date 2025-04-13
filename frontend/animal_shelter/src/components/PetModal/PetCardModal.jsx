import React from "react";
import "./PetCardModal.css";
import ageIcon from "../../assets/images/age.png";
import genderIcon from "../../assets/images/gender.png";
import handsIcon from "../../assets/images/hands.png";

const PetCardModal = ({ isOpen, onClose, pet }) => {
  if (!isOpen || !pet) return null;

  // Функція для правильного відмінювання слів за числами
  const getUnitForm = (value, unit) => {
    // Використовуємо ageUnit, якщо він є у даних тварини

    // Резервний варіант, якщо ageUnit не вказано
    if (unit === "місяць") {
      if (value === 1) return "місяць";
      else if (value > 1 && value < 5) return "місяці";
      else return "місяців";
    } else if (unit === "рік") {
      if (value === 1) return "рік";
      else if (value > 1 && value < 5) return "роки";
      else return "років";
    }
    return unit;
  };

  // Визначення відображення віку
  const getFormattedAge = () => {
    if (!pet.age) return "";

    // Якщо є поле ageUnit, використовуємо його напряму
    if (pet.ageUnit) {
      return `${pet.age} ${pet.ageUnit}`;
    }

    // Якщо ageUnit не вказано, визначаємо одиницю за значенням
    const value = typeof pet.age === "number" ? pet.age : parseInt(pet.age);
    if (isNaN(value)) return pet.age; // Повертаємо вік як є, якщо не число

    // Конвертуємо місяці в роки, якщо більше 12
    if (value >= 12) {
      const years = Math.floor(value / 12);
      return `${years} ${getUnitForm(years, "рік")}`;
    } else {
      return `${value} ${getUnitForm(value, "місяць")}`;
    }
  };

  return (
    <div className="pet-modal-overlay" onClick={onClose}>
      <div className="pet-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="pet-modal-body">
          <div className="pet-modal-image">
            <img src={pet.image} alt={pet.name} />
          </div>

          <div className="pet-modal-info">
            <h2 className="pet-modal-name">{pet.name}</h2>

            <div className="pet-modal-details">
              <div className="pet-detail-item">
                <img src={ageIcon} alt="Age" className="detail-icon" />
                <span>{getFormattedAge()}</span>
              </div>

              <div className="pet-detail-item">
                <img src={genderIcon} alt="Gender" className="detail-icon" />
                <span>{pet.sex}</span>
              </div>

              <div className="pet-detail-item">
                <img src={handsIcon} alt="Shelter" className="detail-icon" />
                <span> {pet.organization || pet.shelter_id}</span>
              </div>
            </div>

            {pet.healthStatus && (
              <div className="pet-health-status">
                <h3>Стан здоров'я:</h3>
                <p>{pet.healthStatus}</p>
              </div>
            )}

            {pet.description && (
              <div className="pet-description">
                <h3>Опис:</h3>
                <p>{pet.description}</p>
              </div>
            )}

            <button className="adopt-button">Взяти додому</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCardModal;

import React from "react";
import "./PetCardModal.css";
import ageIcon from "../../assets/images/age.png";
import genderIcon from "../../assets/images/gender.png";
import handsIcon from "../../assets/images/hands.png";

const PetCardModal = ({ isOpen, onClose, animal, authorName }) => {
  console.log("PetCardModal props:", { animal, isOpen });

  if (!isOpen || !animal) return null;

  const getUnitForm = (value, unit) => {
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

  const getFormattedAge = () => {
    if (!animal.age) return "";

    if (animal.ageUnit) {
      return `${animal.age} ${animal.ageUnit}`;
    }

    const value =
      typeof animal.age === "number" ? animal.age : parseInt(animal.age);
    if (isNaN(value)) return animal.age;

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
            <img src={animal.photo_url} alt={animal.name} />
          </div>

          <div className="pet-modal-info">
            <h2 className="pet-modal-name">{animal.name}</h2>

            <div className="pet-modal-details">
              <div className="pet-detail-item">
                <img src={ageIcon} alt="Age" className="detail-icon" />
                <span>{getFormattedAge()}</span>
              </div>

              <div className="pet-detail-item">
                <img src={genderIcon} alt="Gender" className="detail-icon" />
                <span>{animal.sex}</span>
              </div>

              <div className="pet-detail-item">
                <img src={handsIcon} alt="Shelter" className="detail-icon" />
                <span>
                  {authorName || animal.organization || animal.shelter_id}
                </span>
              </div>
            </div>

            {animal.health_status && (
              <div className="pet-health-status">
                <h3>Стан здоров'я:</h3>
                <p>{animal.health_status}</p>
              </div>
            )}

            {animal.description && (
              <div className="pet-description">
                <h3>Опис:</h3>
                <p>{animal.description}</p>
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

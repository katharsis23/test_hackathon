
import React, { useState, useEffect } from "react";
import "./VolunteerCabinet.css";
import volunteerImage from "../../assets/images/volunteer.svg";
import animalImage from "../../assets/images/image.png";
import ageImage from "../../assets/images/age.png";
import genderImage from "../../assets/images/gender.png";
import handsImage from "../../assets/images/hands.png";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import articleService from "../../services/article_service";
import Article from "../../models/article_model";


const VolunteerCabinet = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [animal, setAnimal] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await authService.get_user_info();
            if (response) {
                setUsername(response.data.username || response.data.name);
            }
            else {
                alert('Get user info failed.')
            }

            ///////////
            const favouriteArticles = await articleService.fetch_favourite_articles();
            console.log("Articles from server:", favouriteArticles);

            const articles = favouriteArticles.map(Article.fromJSON);


            setAnimal(articles);

        }

        fetchUserInfo();
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
            <div className="volunteerInfo">
                <div className="volunteerPhoto">
                    <img src={volunteerImage} className="photo-img" />
                </div>
                <div className="volunteerNameBlock">
                    <div className="volunteerName">
                        <h1>{username}</h1>
                    </div>
                </div>
            </div>
            <div className="volunteerArticlesBody">
                <div className="activeArticles">
                    <h1>Улюблені оголошення: </h1>
                </div>
                <div className="articleCards">
                    {animal.map((article) => (
                        <div className="animalCard" key={article.article_id}>
                            <div className="animalImage">
                                <img
                                    src={article.photo_url || animalImage}
                                    alt={article.name}
                                    className="animalPhoto"
                                    onError={(e) => {
                                        console.log("Failed to load image:", article.photo_url);
                                        e.target.src = animalImage;
                                    }}
                                    crossOrigin="anonymous"
                                />
                            </div>
                            <h2 className="animalName">{article.name}</h2>
                            <div className="description">
                                <h1 className="animalAge">
                                    <img src={ageImage} alt="Age" /> Вік: {article.age}
                                </h1>
                                <h1 className="animalGender">
                                    <img src={genderImage} alt="Gender" />
                                    {article.sex}
                                </h1>
                            </div>
                            <div className="organizationCardName">
                                <img src={handsImage} alt="Organization" />
                                {article.author_name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerCabinet;

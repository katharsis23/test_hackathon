import axios from "axios";
import Article from "../models/article_model";
//import { data } from "react-router-dom";


const base_url="http://localhost:8000/article";


class Article_service{
    //for homepage
    async fetch_article(){
        try{
            const response=await axios.get(`${base_url}/fetch_article_homepage`);
            if (response.status===200){
                const response_data=response.data["array_of_articles"];
                return response_data.map(article=>
                    Article.fromJSON(article)
                );
            }
        }catch(error){
            throw new Error(`An error occured ${error}`)
        }
    }

    async createArticle(article) {
        try {
            const response = await axios.post(`${base_url}/post_article`, article.toJSON());
            return Article.fromJSON(response.data);
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;
        }
    }
    //for volunteer pages
    async fetch_article(volunteer_id){
        try{
            const response=await axios.post(
                `${base_url}/fetch_article_volunteer`,
                {
                    "volunteer_id": volunteer_id
                }
            );
            if(response.status===200){
                return response.data["array_of_articles"].map(article=>Article.fromJSON(article));
            }
        }catch(error){
            throw new Error(`AN ERROR OCCURED ${error}`)
        }
    }

    //for shelter pages
    async fetch_article(shelter_id){
        try{
            const response=await axios.post(
                `${base_url}/fetch_article_shelter`,
                {
                    "shelter_id": shelter_id
                }
            );
            if(response.status===200){
                return response.data["array_of_articles"].map(article=>Article.fromJSON(article));
            }
        }catch(error){
            throw new Error(`AN ERROR OCCURED ${error}`)
        }
    }

    async add_article_to_favourite(volunteer_id, article_id){
        try{
            const payload={
                "volunteer_id": volunteer_id,
                "article_id": article_id
            }
            const response=await axios.post(
                `${base_url}/add_to_favourite`,
                payload
            );
            if (response.status===200){
                return response.data
            }
        }catch(error){
            throw new Error(`AN ERROR OCCURED ${error}`);
        }
    }
    
}

export default {Article_service};
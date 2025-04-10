import axios from "axios";
import Article from "../models/article_model";


const base_url="http://localhost:8000/article";


class Article_service{
 
    async fetch_article_homepage(){
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

}
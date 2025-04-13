import axios from "axios";
import Article from "../models/article_model";
import { get_user_id } from "./cache";
//import { data } from "react-router-dom";

const base_url = "http://localhost:8000/article";

class Article_service {
  //for homepage
  async fetch_article_homepage() {
    try {
      const response = await axios.get(`${base_url}/fetch_article_homepage`);
      if (response.status === 200) {
        const response_data = response.data["array_of_article"];
        return response_data.map((item) => {
          const article = Article.fromJSON(item);

          return {
            ...article,
            author_name: item["author_name"],
          };
        });
      }
    } catch (error) {
      throw new Error(`An error occured ${error}`);
    }
  }

  async createArticle(article) {
    try {
      const response = await axios.post(
        `${base_url}/post_article`,
        article.toJSON()
      );
      return Article.fromJSON(response.data);
    } catch (error) {
      console.error(
        "Error creating article:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
  //for volunteer pages
  async fetch_article_volunteer() {
    try {
      const response = await axios.get(`${base_url}/fetch_article_volunteer`);

      if (response.status === 200) {
        const articles_with_names = response.data.array_of_article.map(
          (item) => {
            // Make sure the item is correctly passed to Article
            const article = Article.fromJSON(item);

            // Ensure volunteer_name is added properly
            return {
              ...article, // spread all the article properties
              volunteer_name: item["volunteer_name"],
            };
          }
        );

        return articles_with_names;
      }
    } catch (error) {
      throw new Error(`AN ERROR OCCURRED ${error}`);
    }
  }

  //for shelter pages
  async fetch_article(shelter_id) {
    try {
      const response = await axios.post(`${base_url}/fetch_article_shelter`, {
        shelter_id: shelter_id,
      });
      if (response.status === 200) {
        return response.data["array_of_article"].map((article) =>
          Article.fromJSON(article)
        );
      }
    } catch (error) {
      throw new Error(`AN ERROR OCCURED ${error}`);
    }
  }

  async add_article_to_favourite(volunteer_id, article_id) {
    try {
      const payload = {
        volunteer_id: volunteer_id,
        article_id: article_id,
      };
      const response = await axios.post(
        `${base_url}/add_to_favourite`,
        payload
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error(`AN ERROR OCCURED ${error}`);
    }
  }

  async fetch_favourite_articles() {
    try {
      const response = await axios.post(
        `${base_url}/fetch_favourite_articles`,
        {
          user_id: get_user_id(),
        }
      );
      if (response.status === 200) {
        return response.data["array_of_favourites"].map((article) =>
          Article.fromJSON(article)
        );
      }
    } catch (error) {
      throw new Error(`AN ERROR OCCURED ${error}`);
    }
  }

  //put all the updated article data here
  async edit_article(articleData) {
    try {
      const response = await axios.put(
        `${base_url}/edit_article`,
        articleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Article updated:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Network or client error:", error.message);
      }
      throw error;
    }
  }
}

export default Article_service;

import axios from "axios";
import Comments from "../models/comments_model";
import { get_user_id } from "./cache";

const base_url = "http://localhost:8000/shelter";

class CommentService {
  async post_comment(shelter_id, description) {
    try {
      const payload = {
        shelter_id: shelter_id,
        volunteer_id: get_user_id(),
        description: description,
      };

      const response = await axios.post(`${base_url}/leave_comment`, payload);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error(`Issue in post_comment, ${error}`);
    }
  }

  async get_comments(shelter_id) {
    try {
      const response = await axios.post(`${base_url}/fetch_comments`, {
        shelter_id: shelter_id,
      });

      if (response.status === 200 && response.data.comments) {
        return response.data.comments.map((comment) =>
          Comments.fromJSON(comment)
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }
}

export default new CommentService();

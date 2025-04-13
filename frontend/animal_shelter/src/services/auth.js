import axios from "axios";
import {
    get_user_id,
    get_user_type,
    save_user_id,
    set_user_type,
} from "./cache";
import { data } from "react-router-dom";

const base_url = "http://localhost:8000/auth";

class Auth_Service {
    async handle_login(username, password) {
        const user_type = get_user_type();
        const payload = { username, password, user_type };

        try {
            const response = await axios.post(base_url + "/login", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const user_id = response.data["user_id"];
            if (!user_id) {
                alert("User id is not defiend");
                throw new Error("User ID undefiend.");
            }

            save_user_id(user_id);

            return { message: "Login successful.", data: response.data };
        } catch (error) {
            alert(`Unexpected error: ${error.message}`);
        }
    }

    async handle_signup(
        username,
        password,
        email,
        shelter_address,
        shelter_category
    ) {
        const user_type = get_user_type();
        const payload = {
            username,
            password,
            email,
            user_type,
            shelter_address,
            shelter_category,
        };

        try {
            const response = await axios.post(base_url + "/signup", payload);

            return { message: "Signup successful.", data: response.data };
        } catch (error) {
            alert(`Unexpected error: ${error.message}`);
        }
    }

    async handle_verification(code) {
        try {
            const response = await axios.post(base_url + "/verify-code", {
                ver_code: code,
            });

            const user_id = response.data.volunteer_id || response.data.shelter_id;

            if (!user_id) {
                alert("User ID undefiend.");
                throw new Error("undefiend");
            }

            save_user_id(user_id);

            return { message: "Signup successful.", data: response };
        } catch (error) {
            alert(`Unexpected error: ${error.message}`);
        }
    }

    async get_user_info() {
        const id = get_user_id();
        const user_type = get_user_type();
        const payload = { id, user_type };

        try {
            const response = await axios.post(base_url + "/get_user_info", payload);

            if (response) {
                return {
                    message: "User info fetched.",
                    data: response.data,
                };
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            alert(`Unexpected error: ${error.message}`);
        }
    }
}

const authService = new Auth_Service();
export default authService;

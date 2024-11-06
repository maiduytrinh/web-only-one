import axios from "axios";
import { baseURL } from "src/utils/config";

class ApiAuth {
  constructor() {
    this.api = axios.create({
      baseURL: baseURL,
    });
  }

  async login(credentials) {
    try {
      const response = await this.api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }
}

export default new ApiAuth();

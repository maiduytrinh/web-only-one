import axios from "axios";
import { baseURL } from "src/utils/config";
import { useAuthStore } from "src/store/AuthStore";

class ApiUser {
  constructor() {
    const authStore = useAuthStore();
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `${authStore.getToken}`,
      },
    });
  }

  async getInfo() {
    try {
      const response = await this.api.get("/users/info");
      return response.data;
    } catch (error) {
      console.error("Error get info:", error);
      throw error;
    }
  }
}

export default new ApiUser();

import axios from "axios";
import { baseURL } from "src/utils/config";
import { useAuthStore } from "src/store/AuthStore";

class ApiDeposit {
  constructor() {
    const authStore = useAuthStore();
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `${authStore.token}`,
      },
    });
  }

  async getOrderProductsByUserId(userId, page, size, status = "") {
    try {
      let params = {
        userId: userId,
        page: page,
        size: size,
        status: status,
      };
      const response = await this.api.get("/orders/user", {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async creatDeposit(body) {
    try {
      const response = await this.api.post("/deposits/create", body);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}

export default new ApiDeposit();

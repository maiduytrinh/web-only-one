import axios from "axios";
import { baseURL } from "src/utils/config";
import { useAuthStore } from "src/store/AuthStore";

class ApiOrderBuff {
  constructor() {
    const authStore = useAuthStore();
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `${authStore.token}`,
      },
    });
  }

  async getOrderBuffByUserId(userId, page, size, status = "") {
    try {
      let params = {
        userId: userId,
        page: page,
        size: size,
        status: status,
      };
      console.log(params);
      const response = await this.api.get("/orders-buff/user", {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Error getOrderBuffByUserId:", error);
      throw error;
    }
  }

  async creatOrderBuffAndPayment(userId, price, body) {
    try {
      let params = {
        userId: userId,
        price: price,
      };
      const response = await this.api.post("/orders-buff/create", body, {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Error creatOrderBuffAndPayment:", error);
      throw error;
    }
  }
}

export default new ApiOrderBuff();

import axios from "axios";
import { baseURL } from "src/utils/config";
import { useAuthStore } from "src/store/AuthStore";

class ApiOrderProduct {
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

  async creatOrderAndPayment(productId, userId, price, quantity) {
    try {
      let params = {
        productId: productId,
        userId: userId,
        price: price,
        quantity: quantity,
      };
      const response = await this.api.post("/orders/create", null, {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}

export default new ApiOrderProduct();

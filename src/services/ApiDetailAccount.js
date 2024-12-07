import axios from "axios";
import { baseURL } from "src/utils/config";
import { useAuthStore } from "src/store/AuthStore";

class ApiDetailAccount {
  constructor() {
    const authStore = useAuthStore();
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `${authStore.token}`,
      },
    });
  }

  async getDetailAccountByOrderIdAndUserId(orderId, userId, page, size) {
    try {
      let params = {
        orderId: orderId,
        userId: userId,
        page: page,
        size: size,
      };
      const response = await this.api.get("/account-details/order", {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching account detail:", error);
      throw error;
    }
  }
}
export default new ApiDetailAccount();

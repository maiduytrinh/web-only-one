import axios from "axios";
import { baseURL } from "src/utils/config";
import { useAuthStore } from "src/store/AuthStore";

class ApiProduct {
  constructor() {
    const authStore = useAuthStore();
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `${authStore.token}`,
      },
    });
  }

  async getProducts(categoryId, type, page, size) {
    try {
      let params = {
        categoryId: categoryId,
        page: page,
        size: size,
        type: type,
      };
      const response = await this.api.get("/products", { params: params });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}

export default new ApiProduct();

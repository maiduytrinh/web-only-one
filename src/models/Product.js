export class Product {
  constructor(data = {}) {
    this.id = data.id || null;
    this.categoryId = data.categoryId || null;
    this.name = data.name || "";
    this.description = data.description || "";
    this.subDescription = data.subDescription || "";
    this.price = data.price || 0;
    this.salePrice = data.salePrice || 0;
    this.stock = data.stock || 0;
    this.image = data.image || "";
    this.created = data.created || null;
  }
  // Phương thức để chuyển đổi dữ liệu từ API
  static fromApi(apiData) {
    return new User({
      id: apiData.id,
      categoryId: apiData.categoryId,
      name: apiData.name,
      description: apiData.description,
      subDescription: apiData.subDescription,
      price: apiData.price,
      salePrice: apiData.salePrice,
      stock: apiData.stock,
      image: apiData.image,
      created: apiData.created,
    });
  }

  // Phương thức để chuẩn bị dữ liệu gửi lên API
  toApi() {
    return {
      id: this.id,
      categoryId: this.categoryId,
      name: this.name,
      description: this.description,
      subDescription: this.subDescription,
      price: this.price,
      salePrice: this.salePrice,
      stock: this.stock,
      image: this.image,
      created: this.created,
    };
  }
}

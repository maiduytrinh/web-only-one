export class OrderBuff {
  constructor(data = {}) {
    // ID and relation fields
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.price = data.price || 0.0;
    this.status = data.status || "pending";
    this.note = data.note || "";
    this.created = data.created || null;

    // Info account
    this.username = data.username || "";
    this.password = data.password || "";
    this.spcF = data.spcF || "";
    this.cookie = data.cookie || "";

    // Info product order
    this.typeOrder = data.typeOrder || "";
    this.keywordSearch = data.keywordSearch || "";
    this.productLink = data.productLink || "";
    this.shopName = data.shopName || "";
    this.shopLink = data.shopLink || "";
    this.productOption = data.productOption || "";
    this.productQuantity = data.productQuantity || 0;

    // Info payment
    this.shopVoucher = data.shopVoucher || "";
    this.platformVoucher = data.platformVoucher || "";

    // Info receive
    this.shipMethod = data.shipMethod || "";
    this.recipientName = data.recipientName || "";
    this.recipientPhone = data.recipientPhone || "";
    this.methodReceive = data.methodReceive || "";
    this.addressReceive = data.addressReceive || "";
    this.detailAddress = data.detailAddress || "";
  }

  // Convert API data to model
  static fromApi(apiData) {
    return new OrderBuff({
      id: apiData.id,
      price: apiData.price,
      status: apiData.status,
      note: apiData.note,
      created: apiData.created,
      username: apiData.username,
      password: apiData.password,
      spcF: apiData.spcF,
      cookie: apiData.cookie,
      typeOrder: apiData.typeOrder,
      keywordSearch: apiData.keywordSearch,
      productLink: apiData.productLink,
      shopName: apiData.shopName,
      shopLink: apiData.shopLink,
      productOption: apiData.productOption,
      productQuantity: apiData.productQuantity,
      shopVoucher: apiData.shopVoucher,
      platformVoucher: apiData.platformVoucher,
      shipMethod: apiData.shipMethod,
      recipientName: apiData.recipientName,
      recipientPhone: apiData.recipientPhone,
      methodReceive: apiData.methodReceive,
      addressReceive: apiData.addressReceive,
      detailAddress: apiData.detailAddress,
    });
  }

  // Convert model to API data
  toApi() {
    return {
      username: this.username,
      password: this.password,
      spcF: this.spcF,
      cookie: this.cookie,
      typeOrder: this.typeOrder,
      keywordSearch: this.keywordSearch,
      productLink: this.productLink,
      shopName: this.shopName,
      shopLink: this.shopLink,
      productOption: this.productOption,
      productQuantity: this.productQuantity,
      shopVoucher: this.shopVoucher,
      platformVoucher: this.platformVoucher,
      shipMethod: this.shipMethod,
      recipientName: this.recipientName,
      recipientPhone: this.recipientPhone,
      methodReceive: this.methodReceive,
      addressReceive: this.addressReceive,
      detailAddress: this.detailAddress,
    };
  }
}

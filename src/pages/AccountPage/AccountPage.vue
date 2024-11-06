<template>
  <q-page>
    <div class="q-pa-md row wrap justify-center items-start q-gutter-lg">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :description="product.description"
        :price="product.price"
        :url="product.url"
        :count="product.count"
        @buy="handleBuy"
      />

      <q-dialog v-model="showDialog">
        <q-card style="min-width: 700px">
          <q-bar class="bg-brand text-white" style="height: 40px">
            <div>Thanh toán đơn hàng</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section class="q-pa-lg">
            <div class="text-h5 q-pb-md text-primary text-bold">
              {{ productClicked?.title }}
            </div>

            <q-separator class="q-mb-sm" />

            <div class="row justify-between">
              <div class="col-7 q-pr-md">
                <div class="text-h6 text-bold">Thông tin sản phẩm</div>
                <div
                  class="q-pl-sm text-subtitle2"
                  style="white-space: pre-line"
                >
                  {{ productClicked?.description }}
                </div>
              </div>
              <div class="col-5 q-pl-md">
                <div class="text-subtitle2 q-pb-sm">
                  Kho:
                  <span class="text-positive text-subtitle1 text-weight-bold"
                    >{{ productClicked?.count }} Sản phẩm</span
                  >
                </div>
                <div class="text-subtitle2 q-pb-sm">
                  Giá tiền:
                  <span class="text-subtitle1 text-weight-bold"
                    >{{ formatNumber(productClicked?.price) }} đ</span
                  >
                </div>
                <div class="q-pb-sm row items-end">
                  <span class="text-subtitle2">Số lượng:</span>
                  <q-input
                    class="q-ml-sm"
                    style="max-width: 100px"
                    filled
                    v-model="count"
                    type="number"
                    dense
                    lazy-rules
                  />
                </div>
              </div>
            </div>

            <q-separator class="q-my-md" />

            <div class="row justify-between items-center">
              <div class="text-h5">
                Tổng tiền: <strong>{{ formatNumber(countAumont) }} đ</strong>
              </div>

              <q-btn
                no-caps
                size="18px"
                color="primary"
                label="Thanh toán"
              ></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import ProductCard from "./ProductCard.vue";
const products = [
  {
    id: 1,
    title: "Nick buff shopee 14 day",
    price: 10000,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 2,
    title: "Product 2",
    price: 2000,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 0,
  },
  {
    id: 3,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 1000,
  },
  {
    id: 4,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 5,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 6,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 7,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 8,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 9,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
  {
    id: 10,
    title: "Product 3",
    price: 300,
    url: "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
    description: "Sản phẩm chất lượng\n Sống lâu\n Bảo hành 1 đổi 1 ",
    count: 200,
  },
];
const productClicked = ref(null);
const showDialog = ref(false);
const count = ref(1);
const countAumont = computed(
  () => count.value * (productClicked.value?.price || 0)
);

const handleBuy = (id) => {
  productClicked.value = products.find((product) => product.id === id);
  count.value = 1;
  showDialog.value = true;
};
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

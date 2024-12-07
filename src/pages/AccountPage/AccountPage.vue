<template>
  <q-page>
    <div class="q-pa-md row wrap justify-center items-start q-gutter-lg">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :description="product.subDescription"
        :price="product.price"
        :image="product.image"
        :stock="product.stock"
        @buy="handleClickBtnBuy"
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
                @click="handlePayment"
              ></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";
import ApiProduct from "src/services/ApiProduct";
import ApiOrderProduct from "src/services/ApiOrderProduct";
import { Product } from "src/models/Product";
import { showNotification } from "src/utils/AppUtils";
import { useAuthStore } from "src/store/AuthStore";

const products = ref([]);
const productClicked = ref(null);
const showDialog = ref(false);
const count = ref(1);
const nextPage = ref(0);

onMounted(async () => {
  try {
    const response = await ApiProduct.getProducts(1, "shopee", 1, 10);
    if (response.statusCode === 200) {
      products.value = response.data.map((product) => new Product(product));
      nextPage.value = response.nextPage;
    } else {
      showNotification(
        "Failed to load products: " + response.data.message,
        false
      );
    }
  } catch (error) {
    showNotification("Failed to load products: " + error.message, false);
  }
});

const countAumont = computed(
  () => count.value * (productClicked.value?.price || 0)
);

const handleClickBtnBuy = (id) => {
  productClicked.value = products.value.find((product) => product.id === id);
  count.value = 1;
  showDialog.value = true;
};

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const authStore = new useAuthStore();

const handlePayment = async () => {
  const response = await ApiOrderProduct.creatOrderAndPayment(
    productClicked.value.id,
    authStore.id,
    countAumont.value,
    count.value
  );
  if (response.statusCode === 200) {
    // Update user balance in store
    authStore.setBalance(response.data.user.balance);

    // Update product stock in products list
    const updatedProduct = products.value.find(
      (p) => p.id === response.data.product.id
    );
    if (updatedProduct) {
      updatedProduct.stock = response.data.product.stock;
    }

    showNotification("Thanh toán thành công", true);
    showDialog.value = false;
  } else {
    showNotification("Thất bại: " + response.message, false);
  }
};
</script>

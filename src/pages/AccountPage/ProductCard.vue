<template>
  <q-card class="my-card" bordered>
    <q-img :src="props.url"> </q-img>
    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ props.title }}</div>
      <div class="text-caption text-grey q-pl-sm" style="white-space: pre-line">
        {{ props.description }}
      </div>
    </q-card-section>

    <q-card-actions class="q-mb-sm">
      <q-btn
        :disable="!isStatus"
        class="q-ml-sm"
        no-caps
        color="primary"
        label="Mua hàng"
        @click="handleBuyClick"
      />

      <q-space />

      <div class="text-h6 text-bold q-mr-sm">
        {{ formatNumber(props.price) }} đ
      </div>
    </q-card-actions>
    <q-badge
      class="q-pa-sm"
      v-if="!isStatus"
      style="font-size: 14px; z-index: 100; border-radius: 3px"
      color="negative"
      rounded
      floating
    >
      Hết hàng
    </q-badge>
    <q-badge
      class="q-pa-sm"
      v-if="isStatus"
      style="font-size: 14px; z-index: 100; border-radius: 3px"
      color="positive"
      rounded
      floating
    >
      Còn {{ props.count }} sp
    </q-badge>
  </q-card>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  description: {
    type: String,
    default: "Sản phẩm chất lượng.\n Sống lâu.\n Bảo hành 1 đổi 1.",
  },
  url: {
    type: String,
    required: true,
    default:
      "https://p-vn.ipricegroup.com/trends-article/tong-hop-cac-ma-giam-gia-khung-nhan-dip-sale-to-sinh-nhat-shopee-1212-medium.jpg",
  },
  title: {
    type: String,
    default: "Tài khoản SEO Shopee",
  },
  id: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 100,
  },
});

const isStatus = computed(() => props.count > 0);
const emit = defineEmits(["buy"]);

const handleBuyClick = () => {
  emit("buy", props.id); // Phát ra sự kiện 'buy' và truyền itemId
};

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>

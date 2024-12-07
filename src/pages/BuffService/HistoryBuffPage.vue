<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        class="custom-table"
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
        :rows-per-page-options="[10, 20, 50]"
        separator="cell"
      >
        <template v-slot:top="props">
          <q-select
            dense
            v-model="selectedStatus"
            :options="statusOptions"
            label="Chọn trạng thái"
            @input="handleSelect"
            style="width: 200px"
          />
          <q-space />
          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            placeholder="Tìm kiếm"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>

        <!-- Process rows status -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <div>
              <q-badge
                :color="getStatusColor(props.value)"
                :label="getStatusText(props.value)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ApiOrderProduct from "src/services/ApiOrderProduct";
import { useAuthStore } from "src/store/AuthStore";
import { showNotification } from "src/utils/AppUtils";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const filter = ref("");
const loading = ref(false);
const rows = ref([]);
const selectedStatus = ref({ label: "Tất cả", value: "" });

const statusOptions = [
  { label: "Tất cả", value: "" },
  { label: "Đang xử lý", value: "pending" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Lỗi xử lý", value: "error" },
  { label: "Hủy", value: "cancelled" },
];
// Fetch data from API
const onRequest = async () => {
  try {
    loading.value = true;
    const response = await ApiOrderProduct.getOrderProductsByUserId(
      authStore.id,
      1,
      100
    );
    if (response.statusCode === 200) {
      rows.value = response.data;
    } else {
      showNotification(
        "Failed to load order history: " + response.message,
        false
      );
    }
  } catch (error) {
    showNotification("Error loading order history: " + error.message, false);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onRequest();
});

const goToDetail = (orderId) => {
  router.push(`/account/history/${orderId}`);
};

const getStatusColor = (status) => {
  const colors = {
    pending: "warning",
    completed: "positive",
    cancelled: "negative",
  };
  return colors[status] || "grey";
};

const getStatusText = (status) => {
  const text = {
    pending: "Đang xử lý",
    completed: "Hoàn thành",
    cancelled: "Hủy",
  };
  return text[status];
};

const columns = [
  {
    name: "id",
    required: true,
    align: "left",
    label: "ID",
    field: "id",
    sortable: true,
  },
  {
    name: "product",
    align: "left",
    label: "Sản phẩm",
    field: (row) => row.product.name,
  },
  {
    name: "price",
    align: "right",
    label: "Giá",
    field: "price",
    format: (val) => `${val.toLocaleString("vi-VN")}đ`,
    sortable: true,
  },
  {
    name: "quantity",
    align: "right",
    label: "Số lượng",
    field: "quantity",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Trạng thái",
    field: "status",
    sortable: true,
  },
  {
    name: "created",
    align: "center",
    label: "Ngày tạo",
    field: "created",
    sortable: true,
  },
];
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>

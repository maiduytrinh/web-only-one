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
            @update:model-value="handleSelect"
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

        <!-- process for username -->
        <template v-slot:body-cell-spcF="props">
          <q-td :props="props">
            <div class="row items-center text-password">
              <q-scroll-area visible style="min-width: 300px; height: 36px">
                {{ props.value }}
              </q-scroll-area>
            </div>
          </q-td>
        </template>

        <!-- process for username -->
        <template v-slot:body-cell-productLink="props">
          <q-td :props="props">
            <div class="row items-center text-password">
              <q-scroll-area visible style="min-width: 300px; height: 36px">
                {{ props.value }}
              </q-scroll-area>
            </div>
          </q-td>
        </template>

        <!-- process for username -->
        <template v-slot:body-cell-shopLink="props">
          <q-td :props="props">
            <div class="row items-center text-password">
              <q-scroll-area visible style="min-width: 300px; height: 36px">
                {{ props.value }}
              </q-scroll-area>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "src/store/AuthStore";
import { showNotification } from "src/utils/AppUtils";
import { useRouter } from "vue-router";
import { OrderBuff } from "src/models/OrderBuff";
import ApiOrderBuff from "src/services/ApiOrderBuff";

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
    const response = await ApiOrderBuff.getOrderBuffByUserId(
      authStore.id,
      1,
      100,
      selectedStatus.value.value
    );
    if (response.statusCode === 200) {
      rows.value = response.data.map(OrderBuff.fromApi);
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

const handleSelect = () => {
  onRequest();
};

const getStatusColor = (status) => {
  const colors = {
    pending: "warning",
    completed: "positive",
    cancelled: "negative",
    error: "negative",
  };
  return colors[status] || "grey";
};

const getStatusText = (status) => {
  const text = {
    pending: "Đang xử lý",
    completed: "Hoàn thành",
    cancelled: "Hủy",
    error: "Lỗi xử lý",
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
    name: "price",
    align: "right",
    label: "Giá",
    field: "price",
    format: (val) => `${val.toLocaleString("vi-VN")}đ`,
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
    name: "note",
    align: "left",
    label: "Ghi chú",
    field: "note",
  },
  {
    name: "username",
    align: "left",
    label: "Username",
    field: "username",
  },
  {
    name: "password",
    align: "left",
    label: "Password",
    field: "password",
  },
  {
    name: "spcF",
    align: "left",
    label: "SPC_F",
    field: "spcF",
  },
  {
    name: "typeOrder",
    align: "left",
    label: "Phương thức đặt",
    field: "typeOrder",
  },
  {
    name: "keywordSearch",
    align: "left",
    label: "Từ khóa",
    field: "keywordSearch",
  },
  {
    name: "productLink",
    align: "left",
    label: "Link sản phẩm",
    field: "productLink",
  },
  {
    name: "shopName",
    align: "left",
    label: "Tên shop",
    field: "shopName",
  },
  {
    name: "shopLink",
    align: "left",
    label: "Link shop",
    field: "shopLink",
  },
  {
    name: "productOption",
    align: "left",
    label: "Phân loại cần đặt",
    field: "productOption",
    sortable: true,
  },
  {
    name: "productQuantity",
    align: "right",
    label: "Số lượng",
    field: "productQuantity",
    sortable: true,
  },
  {
    name: "shipMethod",
    align: "left",
    label: "Phương thức vận chuyển",
    field: "shipMethod",
  },
  {
    name: "recipientName",
    align: "left",
    label: "Tên người nhận",
    field: "recipientName",
  },
  {
    name: "recipientPhone",
    align: "left",
    label: "SĐT người nhận",
    field: "recipientPhone",
  },
  {
    name: "addressReceive",
    align: "left",
    label: "Địa chỉ nhận",
    field: "addressReceive",
  },
  {
    name: "created",
    align: "left",
    label: "Ngày tạo",
    field: "created",
    sortable: true,
  },
];
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3

.text-password
  font-family: monospace
  letter-spacing: 1px
</style>

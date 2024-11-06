<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top="props">
          <q-btn
            no-caps
            color="positive"
            :disable="loading"
            label="Thêm đơn hàng"
            @click="showAddDialog = true"
            icon="add"
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

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <div>
              <q-badge color="purple" :label="props.value" />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Add dialog -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 1000px">
        <q-bar class="bg-brand text-white" style="height: 40px">
          <div>Thêm đơn hàng</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-px-xl q-py-lg">
          <q-form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-12">
                <q-btn
                  no-caps
                  size="13px"
                  color="green-8"
                  label="Tạo đơn hàng loạt (File EXCEL)"
                  class="float-right"
                />
              </div>

              <!-- Thông tin tài khoản -->
              <div class="col-8">
                <div class="text-h6 text-primary">Thông tin tài khoản:</div>
                <div class="row q-col-gutter-md">
                  <div class="col-3">
                    <q-input
                      filled
                      dense
                      v-model="username"
                      label="Tên đăng nhập"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </div>
                  <div class="col-3">
                    <q-input
                      filled
                      dense
                      v-model="password"
                      label="Mật khẩu"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      filled
                      dense
                      v-model="scpf"
                      label="Mã SCP_F"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </div>
                </div>
              </div>

              <!-- Thông tin sản phẩm đặt -->
              <div class="col-8">
                <div class="text-h6 text-primary">
                  Thông tin sản phẩm cần đặt:
                </div>
                <div class="row items-center q-pb-sm">
                  <div class="col-5">Số sản phẩm khác nhau cần đặt:</div>
                  <div class="col">
                    <div class="row justify-between">
                      <q-radio v-model="shape" val="0" label="Đặt 1 sản phẩm" />
                      <q-radio
                        v-model="shape"
                        val="1"
                        label="Đặt nhiều sản phẩm"
                      />
                    </div>
                  </div>
                </div>
                <q-select
                  class="q-mb-md"
                  filled
                  v-model="orderMethod"
                  :options="optionOrderMethods"
                  label="Chọn hình thức đặt hàng"
                  dense
                  options-dense
                  clearable
                />
                <q-input
                  filled
                  dense
                  v-model="username"
                  label="Tên đăng nhập"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  filled
                  dense
                  v-model="username"
                  label="Tên đăng nhập"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <div class="row q-col-gutter-md">
                  <div class="col">
                    <q-input
                      filled
                      dense
                      v-model="username"
                      label="Phân loại cần đặt"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      filled
                      dense
                      type="number"
                      v-model="username"
                      label="Số lượng mỗi phân loại"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4 q-pl-xl">
                <div class="text-h6 text-primary">Thông tin nhận hàng:</div>
                <q-input
                  filled
                  dense
                  v-model="username"
                  label="Họ tên"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  filled
                  dense
                  v-model="username"
                  label="Số điện thoại"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  filled
                  dense
                  v-model="username"
                  label="Số lượng mỗi phân loại"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="q-pt-md col-12 float-right">
                <div class="row justify-end">
                  <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                  <q-btn label="Đặt đơn" type="submit" color="primary" />
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "status",
    label: "Status",
    field: "iron",
    sortable: true,
  },
];
const originalRows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];
const optionOrderMethods = [
  { label: "Tìm kiếm click ADS", value: "ads" },
  { label: "Đặt qua shop", value: "shop" },
  { label: "Đặt qua link sản phẩm", value: "link" },
];
const secondModel = ref("one");
const loading = ref(false);
const filter = ref("");
const rows = ref([...originalRows]);
const showAddDialog = ref(false);
const tab = ref("mails");
const orderMethod = ref(null);
// form input
const name = ref(null);
const age = ref(null);
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>

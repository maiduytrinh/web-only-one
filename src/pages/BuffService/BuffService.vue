<template>
  <q-page>
    <div class="q-pa-md">
      <q-form
        class="q-pa-md bg-white custom-border"
        @submit="onSubmit"
        @reset="onReset"
      >
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
            <div class="text-h6 text-primary">1. Thông tin tài khoản:</div>
            <div class="row q-col-gutter-md">
              <div class="col-3">
                <q-input
                  filled
                  dense
                  v-model="username"
                  label="Tên đăng nhập"
                  lazy-rules
                  :rules="validateInput('tên đăng nhập')"
                />
              </div>
              <div class="col-3">
                <q-input
                  filled
                  dense
                  v-model="password"
                  label="Mật khẩu"
                  lazy-rules
                  :rules="validateInput('mật khẩu')"
                />
              </div>
              <div class="col-6">
                <q-input
                  filled
                  dense
                  v-model="scpf"
                  label="Mã SCP_F"
                  lazy-rules
                  :rules="validateInput('mã SCP_F')"
                />
              </div>
            </div>
          </div>

          <!-- Thông tin sản phẩm đặt -->
          <div class="col-8">
            <div class="text-h6 text-primary">
              2. Thông tin sản phẩm cần đặt:
            </div>
            <q-select
              class="col-12 q-mb-md"
              filled
              v-model="orderMethod"
              :options="optionOrderMethods"
              label="Chọn hình thức đặt hàng"
              dense
              options-dense
              @update:model-value="onOrderMethodChange"
            />
            <div class="row q-col-gutter-x-md">
              <q-input
                class="col-6"
                filled
                dense
                v-model="keywordSearch"
                label="Từ khóa tìm kiếm"
                v-show="showInputKeyword"
                lazy-rules
                :rules="validateInput('từ khóa tìm kiếm', showInputKeyword)"
              />
              <q-input
                class="col-6"
                filled
                dense
                v-model="productName"
                label="Tên sản phẩm"
                v-show="showInputProductName"
                lazy-rules
                :rules="validateInput('tên sản phẩm', showInputProductName)"
              />
              <q-input
                class="col-6"
                filled
                dense
                v-model="productLink"
                label="Link sản phẩm"
                v-show="showInputProductLink"
                lazy-rules
                :rules="validateInput('link sản phẩm', showInputProductLink)"
              />
              <q-input
                class="col-6"
                filled
                dense
                v-model="shopName"
                label="Tên Shop"
                v-show="showInputShopName"
                lazy-rules
                :rules="validateInput('tên shop', showInputShopName)"
              />
              <q-input
                class="col-6"
                filled
                dense
                v-model="shopLink"
                label="Link Shop"
                v-show="showInputShopLink"
                lazy-rules
                :rules="validateInput('link shop', showInputShopLink)"
              />
            </div>
            <div>
              <q-input
                filled
                dense
                v-model="productOptions"
                label="Phân loại cần đặt"
                lazy-rules
                :rules="validateInput('phân loại cần đặt')"
              />
            </div>
            <div>
              <q-input
                filled
                dense
                type="number"
                v-model="productQuantity"
                label="Số lượng mỗi phân loại"
                lazy-rules
                :rules="validateInput('số lượng mỗi phân loại')"
              />
            </div>
          </div>

          <div class="col-4 q-pl-xl">
            <div class="text-h6 text-primary">3. Thông tin thanh toán:</div>
            <q-select
              class="q-mb-md"
              filled
              v-model="shipMethod"
              :options="optionShipMethods"
              label="Phương thức vận chuyển"
              dense
              options-dense
            />
            <q-select
              class="q-mb-md"
              filled
              v-model="payMethod"
              :options="optionPayMethods"
              label="Phương thức thanh toán"
              dense
              options-dense
            />
            <q-input
              class="q-mb-md"
              filled
              dense
              v-model="shopVoucher"
              label="Voucher của shop"
            />
            <q-input
              class="q-mb-md"
              filled
              dense
              v-model="platformVoucher"
              label="Voucher của Shopee"
            />
          </div>

          <div class="col-8">
            <div class="text-h6 text-primary">4. Thông tin nhận hàng:</div>
            <div class="row q-col-gutter-x-md">
              <q-input
                class="col-6"
                filled
                dense
                v-model="receiverName"
                label="Họ tên người nhận"
                lazy-rules
                :rules="validateInput('họ tên người nhận')"
              />
              <q-input
                class="col-6"
                filled
                dense
                v-model="receiverPhone"
                label="Số điện thoại"
                lazy-rules
                :rules="validateInput('số điện thoại')"
              />
              <q-select
                class="q-mb-md col-12"
                filled
                v-model="receiveMethod"
                :options="optionReceiveMethods"
                label="Cách thức nhận đơn"
                dense
                options-dense
              />
              <div class="col-12 text-h7">* Địa chỉ nhận hàng:</div>
              <div class="row col-8 q-col-gutter-x-xs">
                <q-select
                  class="col-4"
                  filled
                  v-model="province"
                  :options="optionProvinces"
                  label="Tỉnh/Thành phố"
                  dense
                  options-dense
                  use-input
                  hide-selected
                  fill-input
                  @update:model-value="updateDistricts"
                  @filter="filterOptionProvince"
                  lazy-rules
                  :rules="[(val) => !!val || 'Vui lòng chọn Tỉnh/Thành phố']"
                />
                <q-select
                  class="col-4"
                  filled
                  v-model="district"
                  :options="optionDistricts"
                  label="Quận/Huyện"
                  dense
                  options-dense
                  use-input
                  hide-selected
                  fill-input
                  @update:model-value="updateCommunes"
                  @filter="filterOptionDistrict"
                  lazy-rules
                  :rules="[(val) => !!val || 'Vui lòng chọn Quận/Huyện']"
                />
                <q-select
                  class="col-4"
                  filled
                  v-model="commune"
                  :options="optionCommunes"
                  label="Phường/Xã"
                  dense
                  options-dense
                  use-input
                  hide-selected
                  fill-input
                  @filter="filterOptionCommune"
                  lazy-rules
                  :rules="[(val) => !!val || 'Vui lòng chọn Phường/Xã']"
                />
              </div>
              <q-input
                class="col-4"
                filled
                dense
                v-model="receiverDetailAddress"
                label="Địa chỉ chi tiết (Số nhà, đường, phố)"
                lazy-rules
                :rules="validateInput('địa chỉ chi tiết')"
              />
            </div>
          </div>

          <!-- action button -->
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
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ApiOrderBuff from "src/services/ApiOrderBuff";
import { useAuthStore } from "src/store/AuthStore";
import { OrderBuff } from "src/models/OrderBuff";
import { showNotification } from "src/utils/AppUtils";

const authStore = useAuthStore();
// option q-select
const optionOrderMethods = [
  { label: "Tìm kiếm click ADS", value: "ads" },
  { label: "Đặt qua shop", value: "shop" },
  { label: "Đặt qua link sản phẩm", value: "link" },
];
const optionShipMethods = [
  { label: "Tiết kiệm", value: "1" },
  { label: "Nhanh", value: "2" },
  { label: "Hỏa tốc", value: "3" },
];
const optionPayMethods = [
  { label: "Thẻ Tín dụng/Ghi nợ", value: "1" },
  { label: "Ví ShopeePay", value: "2" },
  { label: "Thanh toán khi nhận hàng", value: "3" },
];
const optionReceiveMethods = [
  { label: "Tự nhận đơn", value: "1" },
  { label: "Thuê gạch đơn", value: "2" },
];
let provinceValue = [];
let districtValue = [];
let communeValue = [];
const optionProvinces = ref(provinceValue);
const optionDistricts = ref(districtValue);
const optionCommunes = ref(communeValue);

// Visibility flags for inputs
const showInputKeyword = ref(true);
const showInputProductName = ref(false);
const showInputProductLink = ref(true);
const showInputShopName = ref(false);
const showInputShopLink = ref(false);

// input values
const username = ref("");
const password = ref("");
const scpf = ref("");
const keywordSearch = ref("");
const productName = ref("");
const productLink = ref("");
const shopName = ref("");
const shopLink = ref("");
const productOptions = ref("");
const productQuantity = ref();
const orderMethod = ref({ label: "Tìm kiếm click ADS", value: "ads" });

const shipMethod = ref({ label: "Tiết kiệm", value: "1" });
const payMethod = ref({ label: "Thanh toán khi nhận hàng", value: "2" });
const shopVoucher = ref();

const platformVoucher = ref();
const receiveMethod = ref({ label: "Tự nhận đơn", value: "1" });
const receiverName = ref("");
const receiverPhone = ref("");
const province = ref(null);
const district = ref(null);
const commune = ref();
const receiverDetailAddress = ref("");
const addressData = ref([]);
const price = ref(0);

const onOrderMethodChange = (value) => {
  // Reset all visibility flags
  showInputKeyword.value = false;
  showInputProductName.value = false;
  showInputProductLink.value = false;
  showInputShopName.value = false;
  showInputShopLink.value = false;
  keywordSearch.value = "";
  productName.value = "";
  productLink.value = "";
  shopName.value = "";
  shopLink.value = "";
  switch (value.value) {
    case "ads":
      showInputKeyword.value = true;
      showInputProductLink.value = true;
      break;
    case "shop":
      showInputShopLink.value = true;
      showInputShopName.value = true;
      showInputProductName.value = true;
      showInputProductLink.value = true;
      break;
    case "link":
      showInputProductLink.value = true;
      break;
  }
};

const fetchAddressData = async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );

    // Store full data
    addressData.value = response.data;

    // Transform provinces for q-select
    provinceValue = response.data.map((p) => ({
      label: p.Name,
      value: p.Id,
    }));
  } catch (error) {
    console.error("Error fetching address data:", error);
  }
};

const updateDistricts = () => {
  if (!province.value) {
    districtValue = [];
    return;
  }

  // Reset dependent selections
  district.value = null;
  commune.value = null;

  // Find selected province and map districts
  const selectedProvince = provinceValue.find(
    (p) => p.value === province.value.value
  );
  const provinceData = addressData.value.find(
    (p) => p.Id === selectedProvince.value
  );

  districtValue = provinceData.Districts.map((d) => ({
    label: d.Name,
    value: d.Id,
  }));
  optionDistricts.value = districtValue;
};

const updateCommunes = () => {
  if (!district.value) {
    communeValue = [];
    return;
  }

  // Reset commune selection
  commune.value = null;

  // Find selected province and district
  const selectedProvince = optionProvinces.value.find(
    (p) => p.value === province.value.value
  );
  const selectedDistrict = optionDistricts.value.find(
    (d) => d.value === district.value.value
  );

  const provinceData = addressData.value.find(
    (p) => p.Id === selectedProvince.value
  );
  const districtData = provinceData.Districts.find(
    (d) => d.Id === selectedDistrict.value
  );

  communeValue = districtData.Wards.map((w) => ({
    label: w.Name,
    value: w.Id,
  }));
  optionCommunes.value = communeValue;
};

const filterOptionProvince = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    optionProvinces.value = provinceValue.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterOptionDistrict = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    optionDistricts.value = districtValue.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterOptionCommune = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    optionCommunes.value = communeValue.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

onMounted(fetchAddressData);

const fetchApiCreateOrderBuff = async () => {
  const requestData = new OrderBuff({
    username: username.value,
    password: password.value,
    spcF: scpf.value,
    typeOrder: orderMethod.value.value,
    keywordSearch: keywordSearch.value,
    productLink: productLink.value,
    shopName: shopName.value,
    shopLink: shopLink.value,
    productOption: productOptions.value,
    productQuantity: productQuantity.value,
    shopVoucher: shopVoucher.value,
    platformVoucher: platformVoucher.value,
    shipMethod: shipMethod.value.value,
    recipientName: receiverName.value,
    recipientPhone: receiverPhone.value,
    methodReceive: receiveMethod.value.value,
    addressReceive: `${replaceProvinceName(province.value.label)}, ${
      district.value.label
    }, ${commune.value.label}`,
    detailAddress: receiverDetailAddress.value,
  }).toApi();

  console.log("Request data: ", requestData);

  try {
    const response = await ApiOrderBuff.creatOrderBuffAndPayment(
      authStore.id,
      price.value,
      requestData
    );
    console.log("Response: ", response);
    if (response.statusCode === 200) {
      showNotification("Tạo đơn buf thành công.", true);
    } else {
      showNotification(response.message, false);
    }
  } catch (error) {
    showNotification("Lỗi tạo đơn Buff: " + error, false);
  }
};

function replaceProvinceName(provinceName) {
  return provinceName.replace("Tỉnh ", "").replace("Thành phố ", "").trim();
}

function validateInput(inputName, isShow = true) {
  return isShow
    ? [(val) => (val && val.length > 0) || `Vui lòng nhập ${inputName}`]
    : [];
}

const onSubmit = () => {
  fetchApiCreateOrderBuff();
};

const onReset = () => {
  username.value = "";
  password.value = "";
  scpf.value = "";
  keywordSearch.value = "";
  productName.value = "";
  productLink.value = "";
  shopName.value = "";
  shopLink.value = "";
  productOptions.value = "";
  productQuantity.value = null;
  orderMethod.value = { label: "Tìm kiếm click ADS", value: "ads" };
  shipMethod.value = { label: "Tiết kiệm", value: "1" };
  payMethod.value = { label: "Thanh toán khi nhận hàng", value: "2" };
  shopVoucher.value = "";
  platformVoucher.value = "";
  receiveMethod.value = { label: "Tự nhận đơn", value: "1" };
  receiverName.value = "";
  receiverPhone.value = "";
  province.value = null;
  district.value = null;
  commune.value = null;
  receiverDetailAddress.value = "";
};
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>

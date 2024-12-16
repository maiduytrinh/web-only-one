<template>
  <q-page class="q-pa-md">
    <div
      class="order-info-container q-pa-md q-mb-lg bg-grey-1 rounded-borders shadow-1"
    >
      <div class="text-h6 text-weight-bold text-primary q-mb-sm">
        Thông tin thanh toán
      </div>

      <q-separator spaced />

      <div class="q-mb-md">
        <q-icon name="warning" color="warning" />
        <span>
          Vui lòng chụp lại bill cũng như kiểm tra lại đúng
          <strong>số tiền</strong> và
          <strong>nội dung chuyển khoản</strong> trước khi tiến hành thanh toán
        </span>
      </div>
      <div class="row justify-center content-center items-center">
        <div class="q-px-xl">
          <q-img
            :src="linkQr"
            style="height: 500px; width: 400px"
            alt="Mã QR"
          />
        </div>
        <div class="q-px-xl">
          <div class="text-subtitle2 q-pb-sm">
            Số tiền:<br />
            <span class="text-red-8 text-subtitle1 text-weight-bold"
              >{{ formatNumber(amount) }} Đ</span
            >
          </div>
          <div class="text-subtitle2 q-pb-sm">
            Nội dung chuyển khoản:<br />
            <span class="text-subtitle1 text-weight-bold">{{
              description
            }}</span>
          </div>
          <div class="text-subtitle2 q-pb-sm">
            Tài khoản người nhận:<br />
            <span class="text-subtitle1 text-weight-bold">{{
              recipientAccount
            }}</span>
          </div>
          <div class="text-subtitle2 q-pb-sm">
            Ngân hàng:<br />
            <span class="text-subtitle1 text-weight-bold">{{
              recipientBank
            }}</span>
          </div>
          <div class="text-subtitle2 q-pb-sm">
            Tên người nhận:<br />
            <span class="text-subtitle1 text-weight-bold">{{
              recipientName
            }}</span>
          </div>
          <div class="text-subtitle2 q-pt-md text-negative">
            *Sau khi chuyển khoản, vui lòng nhấn vào đây*<br />
          </div>
          <q-btn
            class="q-mt-sm"
            no-caps
            label="Đã chuyển khoản"
            color="primary"
            style="max-height: 40px"
            @click="onClickTransfer"
          />
        </div>
      </div>
      <div class="text-caption text-grey-8 q-mt-md">
        * Đơn hàng sẽ tự động được xử lý sau 1-3 phút, sau đó khi hệ thống xác
        nhận sẽ cộng tiền vào ví cho quý khách.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "src/store/AuthStore";
import ApiDeposit from "src/services/ApiDeposit";
import { showNotification } from "src/utils/AppUtils";

const route = useRoute();
const authStore = useAuthStore();

// recipient info
const recipientAccount = ref("7234321");
const recipientBank = ref("ACB BANK");
const recipientName = ref("MAI DUY TRINH");

// payment info
const amount = computed(() => {
  return route.query.amount;
});

const type = computed(() => {
  return route.query.type;
});

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const linkQr = computed(() => {
  return `https://img.vietqr.io/image/ACB-7234321-compact2.png?amount=${amount.value}&addInfo=${description.value}&accountName=MAI DUY TRINH`;
});

const description = computed(() => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Generate random two-letter prefix
  const prefix =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));

  // Generate random 5-digit number
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number

  return `${prefix}${randomNumber}`;
});

const onClickTransfer = async () => {
  // Your code to redirect to payment gateway or call payment API
  let body = {
    amount: amount.value,
    transactionCode: description.value,
    type: type.value,
    userId: authStore.id,
    recipientAccount: recipientAccount.value,
    recipientBank: recipientBank.value,
    recipientName: recipientName.value,
  };
  try {
    const response = await ApiDeposit.creatDeposit(body);
    if (response.statusCode === 200) {
      showNotification("Nạp tiền thành công.", true);
    } else {
      showNotification(response.message, false);
    }
  } catch (error) {
    showNotification("Lỗi tạo nạp tiền", false);
  }
};
</script>

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
            <span class="text-subtitle1 text-weight-bold">7234321</span>
          </div>
          <div class="text-subtitle2 q-pb-sm">
            Ngân hàng:<br />
            <span class="text-subtitle1 text-weight-bold">ACB BANK</span>
          </div>
          <div class="text-subtitle2 q-pb-sm">
            Tên người nhận:<br />
            <span class="text-subtitle1 text-weight-bold">MAI DUY TRINH</span>
          </div>
        </div>
      </div>
      <div class="text-caption text-grey-8 q-mt-md">
        Đơn hàng sẽ tự động được xử lý sau 1-3 phút, sau đó khi hệ thống xác
        nhận, hệ thống sẽ tự động chuyển hướng tới
        <strong>License của tôi</strong>. Một email cũng sẽ được gửi tới bạn với
        thông tin chi tiết về đơn hàng.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const amount = computed(() => {
  return route.query.amount;
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
</script>

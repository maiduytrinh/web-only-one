<template>
  <q-page>
    <div class="q-ma-md bg-white" style="min-height: 600px">
      <div class="q-pa-md text-h6 text-weight-bold">Nạp tiền vào tài khoản</div>
      <div class="q-pb-md q-pl-md text-body2 text-grey-7">
        Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới
      </div>
      <div class="q-pa-md">
        <q-list bordered class="rounded-borders">
          <!-- Viet QR -->
          <q-expansion-item clickable group="group">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar size="50px" square>
                  <img src="src/assets/viet_qr_icon.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Thanh toán VIET-QR</q-item-label>
                <q-item-label caption
                  >Quét mã QR PAY trên ứng dụng Mobile Banking</q-item-label
                >
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <p>
                    Mở App ngân hàng trên điện thoại, chọn phần QR Pay và nhập
                    số tiền bạn muốn nạp vào khung bên dưới.
                  </p>
                  <div class="row">
                    <q-input
                      style="width: 300px"
                      filled
                      label="Số tiền muốn nạp"
                      v-model="amount"
                      type="number"
                      dense
                      lazy-rules
                      :rules="[amountRule]"
                    />
                    <q-btn
                      class="q-ml-md"
                      no-caps
                      label="Nạp tiền"
                      color="primary"
                      :to="
                        isAmountValid ? getPaymentLink(amount, 'vietqr') : null
                      "
                      style="max-height: 40px"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Momo -->
          <q-expansion-item clickable group="group">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar size="50px" square>
                  <img src="src/assets/momo_icon.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  >Nạp số dư trực tiếp bằng Momo Payment</q-item-label
                >
                <q-item-label caption
                  >Nạp Dcoin tự động liên kết với Ví Momo</q-item-label
                >
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <p class="text-negative">Đang phát triển ...</p>
                  <!-- <p>
                    Mở App ngân hàng trên điện thoại, chọn phần QR Pay và nhập
                    số tiền bạn muốn nạp vào khung bên dưới.
                  </p>
                  <div class="row">
                    <q-input
                      style="width: 300px"
                      filled
                      label="Số tiền muốn nạp"
                      v-model="amount"
                      type="number"
                      dense
                    />
                    <q-btn
                      class="q-ml-md"
                      no-caps
                      label="Nạp tiền"
                      @click="onLogin"
                      color="primary"
                    />
                  </div> -->
                </q-form>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
const amount = ref();
const errorMessage = ref("");

const amountRule = (val) => {
  return val >= 10000 || "Số tiền phải lớn hơn 10.000";
};

const isAmountValid = computed(() => {
  return amount.value >= 10000; // Kiểm tra số tiền lớn hơn 10.000
});

const getPaymentLink = (amount, type) => {
  return {
    name: "Payment",
    query: {
      amount: amount,
      type: type,
    },
  };
};
</script>

<template>
  <div
    class="q-pa-md flex flex-center"
    style="background-color: #1a2038; height: 100vh"
  >
    <q-card
      bordered
      class="row items-center"
      style="max-width: 1000px; min-height: 400px; border-radius: 12px"
    >
      <q-card-section class="q-pa-md" horizontal>
        <div class="q-px-md" style="min-width: 350px">
          <img src="../assets/Mobile login-amico.svg" width="100%" alt="" />
        </div>
        <div class="column justify-center q-pa-md" style="min-width: 350px">
          <q-form @submit="onRegister">
            <q-input
              filled
              label="Username"
              v-model="username"
              type="text"
              class="q-mb-md"
              dense
              :rules="[(val) => !!val || 'Username không được để trống']"
            />
            <q-input
              filled
              label="Email"
              v-model="email"
              type="email"
              class="q-mb-md"
              dense
              :rules="[(val) => !!val || 'Email không được để trống']"
            />
            <q-input
              class="q-mb-md"
              v-model="password"
              filled
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              dense
              :rules="[
                (val) => !!val || 'Password không được để trống',
                (val) => val.length >= 6 || 'Password phải dài hơn 6 ký tự',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Đăng ký"
              type="submit"
              class="q-mb-md"
            />
            <div>
              <span>Bạn đã có tài khoản? </span>
              <q-btn
                no-caps
                flat
                label="Đăng nhập"
                color="primary"
                to="/login"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import ApiAuth from "src/services/ApiAuth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showNotification } from "src/utils/AppUtils";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const isPwd = ref(true);

const onRegister = async () => {
  const response = await ApiAuth.register({
    username: username.value,
    password: password.value,
    email: email.value,
  });

  if (response.statusCode == 200) {
    localStorage.setItem(
      "credentials",
      JSON.stringify({
        username: username.value,
        password: password.value,
      })
    );
    showNotification("Đăng ký thành công", true);
    router.push("/login");
  } else {
    showNotification(response.message);
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>

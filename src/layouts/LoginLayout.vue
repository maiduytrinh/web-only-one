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
          <img src="../assets/Mobile login-rafiki.svg" width="100%" alt="" />
        </div>
        <div class="column justify-center q-pa-md" style="min-width: 350px">
          <q-form @submit="onLogin">
            <q-input
              filled
              label="Username"
              v-model="username"
              type="text"
              class="q-mb-md"
              :rules="[(val) => !!val || 'Username is required']"
              dense
            />
            <q-input
              class="q-mb-md"
              v-model="password"
              filled
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              dense
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="row justify-between q-mb-md">
              <q-checkbox size="sm" v-model="rememberMe" label="Lưu mật khẩu" />
              <q-btn
                no-caps
                flat
                label="Quên mật khẩu?"
                color="primary"
                @click="onForgotPassword"
              />
            </div>
            <q-btn
              label="Đăng nhập"
              class="q-mb-md"
              type="submit"
              color="primary"
            />
            <div>
              <span>Bạn chưa có tài khoản? </span>
              <q-btn
                no-caps
                flat
                label="Đăng ký"
                color="primary"
                to="/signup"
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
import { useAuthStore } from "src/store/AuthStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showNotification } from "src/utils/AppUtils";

const router = useRouter();
const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const isPwd = ref(true);

// Load saved credentials
const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
if (savedCredentials) {
  username.value = savedCredentials.username;
  password.value = savedCredentials.password;
  rememberMe.value = true;
}

const onLogin = async () => {
  try {
    const response = await ApiAuth.login({
      username: username.value,
      password: password.value,
    });

    if (response.statusCode === 200) {
      const authStore = useAuthStore();
      authStore.setAuth(response.data);

      if (rememberMe.value) {
        localStorage.setItem(
          "credentials",
          JSON.stringify({
            username: username.value,
            password: password.value,
          })
        );
      }
      showNotification("Đăng nhập thành công", true);
      router.push("/dashboard");
    } else {
      showNotification("Tên tài khoản hoặc mật khẩu không đúng!", false);
    }
  } catch (error) {
    showNotification("Login failed: " + error.message, false);
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>

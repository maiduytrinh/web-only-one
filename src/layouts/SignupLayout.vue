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
          <q-form @submit="onLogin">
            <q-input
              filled
              label="Username"
              v-model="username"
              type="text"
              class="q-mb-md"
              dense
            />
            <q-input
              filled
              label="Email"
              v-model="email"
              type="email"
              class="q-mb-md"
              dense
            />
            <q-input
              filled
              label="Password"
              v-model="password"
              type="password"
              class="q-mb-md"
              dense
            />
            <q-btn
              color="primary"
              label="Đăng ký"
              @click="onLogin"
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

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    onLogin() {
      // Handle login logic here
    },
    onForgotPassword() {
      // Handle forgot password logic here
    },
    onRegister() {
      // Handle register logic here
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>

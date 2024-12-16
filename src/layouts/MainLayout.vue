<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-separator vertical inset class="q-ml-sm" />

        <!-- wallet-menu -->
        <q-btn
          no-caps
          flat
          rounded
          color="primary"
          icon="local_atm"
          :label="`${formatNumber(balance)} Đ`"
        >
          <q-menu fit auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable to="/recharge">
                <q-item-section>Nạp tiền</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Lịch sử nạp</q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>

        <q-space />

        <!-- project menu -->
        <q-btn no-caps flat rounded>
          {{ username }}
          <q-avatar size="40px" class="q-ml-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <q-menu fit auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Thông tin tài khoản</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Cài đặt</q-item-section>
              </q-item>
              <q-separator />
              <q-item class="text-negative" clickable @click="onLogout">
                <q-item-section>Đăng xuất</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <ToolBarLeft :menuList="menuList" :leftDrawerOpen="leftDrawerOpen" />

    <q-page-container class="bg-grey-4">
      <router-view />
      <!-- place QPageScroller at end of page -->
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>

    <q-footer class="bg-brand">
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import ToolBarLeft from "src/components/ToolBarLeft.vue";
import { useAuthStore } from "src/store/AuthStore";

defineOptions({
  name: "MainLayout",
});

const menuList = [
  {
    icon: "dashboard",
    label: "Dashboard",
    link: "/dashboard",
    separator: true,
  },
  {
    icon: "account_box",
    label: "Dịch vụ tài khoản",
    children: [
      {
        icon: "people",
        label: "Mua tài khoản",
        link: "/account",
      },
      {
        icon: "restore",
        label: "Lịch sử mua",
        link: "/account/history",
      },
    ],
    separator: true,
  },
  {
    icon: "addchart",
    label: "Dịch vụ Buff",
    link: "/buffservice",
    children: [
      {
        icon: "add_circle_outline",
        label: "Tạo đơn buff",
        link: "/buffservice",
      },
      {
        icon: "restore",
        label: "Lịch sử buff đơn",
        link: "/buffservice/history",
      },
    ],
    separator: true,
  },
];

const authStore = useAuthStore();
const leftDrawerOpen = ref(true);
const router = useRouter();
const username = computed(() =>
  authStore.username ? authStore.username : "User Name"
);
const balance = computed(() => (authStore.balance ? authStore.balance : 0));

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function onLogout() {
  authStore.clearAuth();
  router.push("/login");
}

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background-color: rgba(128, 128, 128, 0.3)
</style>

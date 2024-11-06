const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/dashboard" },
      {
        path: "/dashboard",
        component: () => import("pages/DashBoard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/account",
        component: () => import("pages/AccountPage/AccountPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/buffservice",
        component: () => import("pages/BuffService/BuffService.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/recharge",
        component: () => import("pages/RechargePage/RechargePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/payment",
        component: () => import("pages/RechargePage/PaymentPage.vue"),
        name: "Payment",
        meta: { requiresAuth: true },
      },
      {
        path: "/paymentaccount",
        component: () => import("pages/Payment/PaymentAccount.vue"),
        name: "Paymentaccount",
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
  },
  {
    path: "/signup",
    component: () => import("layouts/SignupLayout.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

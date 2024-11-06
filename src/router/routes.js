const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/dashboard" },
      { path: "/dashboard", component: () => import("pages/DashBoard.vue") },
      {
        path: "/account",
        component: () => import("pages/AccountPage/AccountPage.vue"),
      },
      {
        path: "/buffservice",
        component: () => import("pages/BuffService/BuffService.vue"),
      },
      {
        path: "/recharge",
        component: () => import("pages/RechargePage/RechargePage.vue"),
      },
      {
        path: "/payment",
        component: () => import("pages/RechargePage/PaymentPage.vue"),
        name: "Payment",
      },
      {
        path: "/paymentaccount",
        component: () => import("pages/Payment/PaymentAccount.vue"),
        name: "Paymentaccount",
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

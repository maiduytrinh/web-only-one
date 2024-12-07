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
        path: "/account/history",
        component: () =>
          import("pages/AccountPage/HistoryOrderAccountPage.vue"),
        name: "HistoryOrderAccount",
        meta: { requiresAuth: true },
      },
      {
        path: "/buffservice",
        component: () => import("pages/BuffService/BuffService.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/buffservice/history",
        component: () => import("pages/BuffService/HistoryBuffPage.vue"),
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
        path: "/account/history/:id",
        name: "DetailAccount",
        component: () => import("pages/AccountPage/DetailAccountPage.vue"),
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

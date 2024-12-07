import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    id: 0,
    username: null,
    permissions: [],
    roles: [],
    token: null,
    balance: 0,
  }),

  getters: {
    // Kiểm tra user đã đăng nhập chưa
    isLoggedIn: (state) => {
      return !!state.token;
    },

    // // Kiểm tra user có quyền cụ thể không
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission);
    },

    // Kiểm tra user có role cụ thể không
    hasRole: (state) => (role) => {
      return state.roles.includes(role);
    },

    // Kiểm tra user có một trong các quyền được truyền vào không
    hasAnyPermission: (state) => (permissions) => {
      return permissions.some((permission) =>
        state.permissions.includes(permission)
      );
    },

    // Kiểm tra user có một trong các role được truyền vào không
    hasAnyRole: (state) => (roles) => {
      return roles.some((role) => state.roles.includes(role));
    },

    isTokenExpired() {
      if (!this.token) return true;
      try {
        const tokenData = JSON.parse(atob(this.token.split(".")[1]));
        console.log(tokenData);
        return tokenData.exp * 1000 < Date.now();
      } catch (e) {
        return true;
      }
    },
  },

  actions: {
    hydrate() {
      // Load auth state from localStorage
      const authData = localStorage.getItem("authData");
      const balance = localStorage.getItem("balance");
      if (authData) {
        const data = JSON.parse(authData);
        this.id = data.id;
        this.username = data.username;
        this.permissions = data.permissions;
        this.roles = data.roles;
        this.token = data.token;

        this.balance = balance;

        // Check token expiration
        if (this.isTokenExpired) {
          this.handleTokenExpiration();
        }
      }
    },

    // Lưu thông tin đăng nhập
    setAuth(authData) {
      this.id = authData.id;
      this.username = authData.username;
      this.permissions = authData.permissions || [];
      this.roles = authData.roles || [];
      this.token = authData.token;
      this.balance = authData.balance;

      // Save complete auth data to localStorage
      localStorage.setItem(
        "authData",
        JSON.stringify({
          id: this.id,
          username: this.username,
          permissions: this.permissions,
          roles: this.roles,
          token: this.token,
        })
      );
      localStorage.setItem("balance", this.balance);
    },

    handleTokenExpiration() {
      this.clearAuth();
    },

    // Xóa thông tin đăng nhập
    clearAuth() {
      this.id = 0;
      this.username = null;
      this.permissions = [];
      this.roles = [];
      this.token = null;
      this.balance = 0;

      localStorage.removeItem("authData");
      localStorage.removeItem("balance");
    },

    setBalance(balance) {
      this.balance = balance;
      localStorage.setItem("balance", balance);
    },
  },
});

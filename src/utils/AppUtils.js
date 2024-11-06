import { Notify } from "quasar";

export const showNotification = (message, isSuccess = false) => {
  Notify.create({
    message,
    color: isSuccess ? "positive" : "negative",
    position: "top-right",
    type: isSuccess ? "positive" : "negative",
    timeout: 2500,
  });
};

// utils/toastUtils.js
import { toast } from "react-toastify";

export const showSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });

export const showError = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });

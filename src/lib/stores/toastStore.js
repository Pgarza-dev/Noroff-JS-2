import { Store } from "@/lib/stores/store";

export const toastStore = new Store({
  toasts: [],
});

export const addToast = (message, type = "info", timeout = 4000) => {
  return (state) => {
    const newToast = {
      id: new Date().getTime(),
      message,
      type,
    };

    setTimeout(() => {
      toastStore.setState(removeToast(newToast.id));
    }, timeout);

    return {
      toasts: [...state.toasts, newToast],
    };
  };
};

export const removeToast = (id) => {
  return (state) => {
    return {
      toasts: state.toasts.filter((toast) => toast.id !== id),
    };
  };
};

export default toastStore;

import { Store } from "@/lib/stores/store";

class ToastStore extends Store {
  constructor(initialState) {
    super(initialState);
  }

  addToast(message, type = "info", timeout = 3500) {
    const newToast = {
      id: new Date().getTime(),
      message,
      type,
    };

    setTimeout(() => {
      this.setState(this.removeToast(newToast.id));
    }, timeout);

    this.setState((state) => ({
      toasts: [...state.toasts, newToast],
    }));
  }

  removeToast(id) {
    return (state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    });
  }
}

const toastStore = new ToastStore({
  toasts: [],
});

export default toastStore;

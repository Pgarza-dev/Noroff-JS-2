import { CustomComponent } from "../customComponent.js";
import toastStore from "@lib/stores/toastStore";
import { Toast } from "./toast.js"; // Import the Toast component

export class ToastWrapper extends CustomComponent {
  constructor() {
    super();
    this.toasts = [];
  }

  connectedCallback() {
    this.unsubscribe = toastStore.subscribe((newState) => {
      this.renderToasts(newState.toasts);
    });
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  renderToasts(toastData) {
    const maxToasts = 5;
    const limitedToasts = toastData.slice(-maxToasts);

    this.removeOldToasts(limitedToasts);
    this.addNewToasts(limitedToasts);
  }

  removeOldToasts(limitedToasts) {
    this.toasts = this.toasts.filter((toastComponent) => {
      const stillExists = limitedToasts.some(
        (toast) => toast.id === toastComponent.toast.id,
      );
      if (!stillExists) {
        toastComponent.style.transform = `translateXY(-50%, ${-100}px)`;

        setTimeout(() => {
          this.removeChild(toastComponent);
        }, 300);
      }
      return stillExists;
    });
  }

  addNewToasts(limitedToasts) {
    limitedToasts.forEach((toast, index) => {
      const alreadyExists = this.toasts.some(
        (toastComponent) => toast.id === toastComponent.toast.id,
      );
      if (!alreadyExists) {
        const toastComponent = new Toast(toast);
        toastComponent.style.transform = `translateXY(-50%, ${index * 60}px)`;
        this.toasts.push(toastComponent);
        this.appendChild(toastComponent);
      }
    });
  }
}

customElements.define("toast-wrapper", ToastWrapper);

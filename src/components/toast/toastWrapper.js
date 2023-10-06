import { CustomComponent } from "../customComponent.js";
import toastStore from "@lib/stores/toastStore";
import { Toast } from "./toast.js";

export class ToastWrapper extends CustomComponent {
  constructor() {
    super();
    this.toasts = [];

    this.popoverDiv = document.createElement("div");
    this.popoverDiv.classList.add("toast-container");
    this.popoverDiv.setAttribute("popover", "manual");
    this.appendChild(this.popoverDiv);
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
    const maxToasts = 3; // Limit the amount of toasts displayed at once
    const limitedToasts = toastData.slice(-maxToasts);
    this.removeOldToasts(limitedToasts);
    this.addNewToasts(limitedToasts);
    this.togglePopover(limitedToasts.length === 0);
  }

  removeOldToasts(limitedToasts) {
    this.toasts = this.toasts.filter((toastComponent) => {
      const stillExists = limitedToasts.some(
        (toast) => toast.id === toastComponent.toast.id,
      );
      if (!stillExists) {
        toastComponent.classList.remove("toast-in");
        toastComponent.classList.add("toast-out");
        setTimeout(() => {
          this.popoverDiv.removeChild(toastComponent);
        }, 300);
      }
      return stillExists;
    });
  }

  addNewToasts(limitedToasts) {
    limitedToasts.forEach((toast) => {
      const alreadyExists = this.toasts.some(
        (toastComponent) => toast.id === toastComponent.toast.id,
      );
      if (!alreadyExists) {
        const toastComponent = new Toast(toast);
        this.toasts.push(toastComponent);
        this.popoverDiv.appendChild(toastComponent);
      }
    });
  }

  togglePopover(shouldClose) {
    shouldClose ? this.closePopover() : this.showPopover();
  }

  closePopover() {
    this.popoverDiv.hidePopover();
  }

  showPopover() {
    this.popoverDiv.showPopover();
  }
}

customElements.define("toast-wrapper", ToastWrapper);

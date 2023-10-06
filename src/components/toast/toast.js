import { CustomComponent } from "../customComponent.js";
import toastHtml from "./toast.html?raw";

export class Toast extends CustomComponent {
  constructor(toast) {
    super();
    this.toast = toast;
    this.innerHTML = toastHtml;

    const toastTitle = this.getSlot("toastTitle");
    const toastBody = this.getSlot("toastBody");
    toastTitle.textContent = this.toast.type || "";
    toastBody.textContent = this.toast.message || "";
  }
}

customElements.define("app-toast", Toast);

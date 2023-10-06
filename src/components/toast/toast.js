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

    this.applyTailwindClasses();
  }

  applyTailwindClasses() {
    const type = this.toast.type;
    let classes = "";

    switch (type) {
      case "info":
        classes = "bg-blue-500 text-white";
        break;
      case "success":
        classes = "bg-green-500 text-white";
        break;
      case "warning":
        classes = "bg-yellow-500 text-black";
        break;
      case "error":
        classes = "bg-red-500 text-white";
        break;
      default:
        classes = "bg-stone-600 text-white";
    }

    this.getSlot("toastWrapper").classList.add(...classes.split(" "));
  }
}

customElements.define("app-toast", Toast);

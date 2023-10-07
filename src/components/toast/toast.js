import { CustomComponent } from "../customComponent.js";
import toastHtml from "./toast.html?raw";

export class Toast extends CustomComponent {
  constructor(toast) {
    super();
    this.toast = toast;
    this.setAttribute("popover", "manual");
    this.classList.add("toast");
    this.innerHTML = toastHtml;

    this.getSlot("toastBody").textContent = this.toast.message || "";

    this.applyTailwindClasses();
  }

  connectedCallback() {
    this.showPopover();
  }

  applyTailwindClasses() {
    const type = this.toast.type;
    let classes = "";

    switch (type) {
      case "info":
        classes = "bg-blue-700 text-white";
        break;
      case "success":
        classes = "bg-green-800 text-white";
        break;
      case "warning":
        classes = "bg-orange-500 text-black";
        break;
      case "error":
        classes = "bg-red-500 text-white";
        break;
      default:
        classes = "bg-stone-600 text-white";
    }

    this.getSlot("toastWrapper").classList.add(...classes.split(" "));
  }

  animateOut() {
    this.classList.add("toast-out");
  }
}

customElements.define("app-toast", Toast);

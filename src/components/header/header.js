import { CustomComponent } from "../customComponent.js";
import headerHtml from "./header.html?raw";

export class Header extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = headerHtml;
  }

  connectedCallback() {
    this.updateActiveLink();
    this.setProfileLink();
  }

  updateActiveLink() {
    this.querySelectorAll("a").forEach((link) => {
      const isActive = link.getAttribute("href") === window.location.pathname;
      link.classList.toggle("text-neutral-200", isActive);
    });
  }

  setProfileLink() {
    const profileLink = this.querySelector("#profile-link");

    const username = localStorage.getItem("username");
    if (!username) {
      console.warn("No username found in localStorage.");
      return;
    }
    profileLink.href = `/user/?username=${username}`;
  }
}

customElements.define("app-header", Header);

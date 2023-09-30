import { CustomComponent } from "../customComponent.js";
import { getActiveUser } from "@/lib/utils/handleLocalStorageUser.js";
import headerHtml from "./header.html?raw";
import { AccountMenuDropdown } from "@/components/header/accountMenuDropdown.js";

export class Header extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = headerHtml;
    this.accountMenu = new AccountMenuDropdown();
  }

  connectedCallback() {
    this.updateActiveLink();
    this.setProfileLink();

    this.populateData({
      accountMenuDropdown: this.accountMenu,
    });

    this.addEventListeners();
  }

  updateActiveLink() {
    this.querySelectorAll("a").forEach((link) => {
      const isActive = link.getAttribute("href") === window.location.pathname;
      link.classList.toggle("text-neutral-200", isActive);
    });
  }

  setProfileLink() {
    const profileLink = this.querySelector("#profile-link");
    const username = getActiveUser();
    profileLink.href = `/user/?username=${username}`;
  }

  addEventListeners() {
    this.onClick("accountMenuBtn", this.accountMenu.toggleHidden);
  }
}

customElements.define("app-header", Header);

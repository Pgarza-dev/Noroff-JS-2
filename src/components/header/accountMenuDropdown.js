import {
  getActiveUser,
  removeActiveUser,
} from "@/lib/utils/handleLocalStorageUser.js";
import { CustomComponent } from "../customComponent.js";
import accountMenuDropdownHtml from "./accountMenuDropdown.html?raw";

export class AccountMenuDropdown extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = accountMenuDropdownHtml;
    this.classList.add("hidden");
  }

  connectedCallback() {
    this.setProfileLink();
    this.addEventListeners();
  }

  setProfileLink() {
    const profileLink = this.querySelector(
      "#account-menu-dropdown-profile-link",
    );
    const username = getActiveUser();
    profileLink.href = `/user/?username=${username}`;
  }

  handleLogout = () => {
    removeActiveUser();
    window.location.href = "/login/";
  };

  addEventListeners() {
    this.onClick("logoutBtn", this.handleLogout);
    this.clickedOutside("accountMenuDropdown", this.hideMenuOnOutsideClick);
  }

  toggleHidden = (event) => {
    this.classList.toggle("hidden");
    event.stopPropagation();
  };

  hideMenuOnOutsideClick = () => {
    this.classList.add("hidden");
  };
}

customElements.define("app-account-menu-dropdown", AccountMenuDropdown);

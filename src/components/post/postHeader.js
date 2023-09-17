import postHeader from "./postHeader.html?raw";
import { CustomComponent } from "../customComponent.js";

export class PostHeader extends CustomComponent {
  constructor(author, created) {
    super();
    this.author = author;
    this.created = created;
  }

  connectedCallback() {
    this.innerHTML = postHeader;

    this.populateData({
      author: this.author,
      date: this.formatDateFromNow(this.created),
      time: this.formatDate(this.created, "HH:mm"),
      authorLink: {
        type: "attribute",
        attrName: "href",
        attrValue: `/users/${this.author}`,
      },
    });
    this.addEventListeners();
  }

  addEventListeners() {
    this.onClick("postMenuBtn", this.togglePostMenu);
    this.clickedOutside("postMenuDropdown", this.hideMenuOnOutsideClick);
  }

  togglePostMenu = (event) => {
    this.toggleHidden(this.getSlot("postMenuDropdown"));
    event.stopPropagation();
  };

  hideMenuOnOutsideClick = () => {
    this.hideElement(this.getSlot("postMenuDropdown"));
  };
}

customElements.define("post-header", PostHeader);

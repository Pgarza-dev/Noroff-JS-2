import postHeader from "./postHeader.html?raw";
import { CustomComponent } from "../customComponent.js";

export class PostHeader extends CustomComponent {
  /**
   * @param {AuthorData} author - The author of the post.
   * @param {string} created - The creation date (e.g., "2023-08-30T23:59:59Z").
   */
  constructor(author, created) {
    super();
    this.author = author;
    this.created = created;
  }

  connectedCallback() {
    this.innerHTML = postHeader;

    const avatar = this.author.avatar || "/images/default_user.png";

    this.populateData({
      author: this.author.name,
      time: this.formatDateFromNow(this.created),
      authorLink: {
        type: "attribute",
        attrName: "href",
        attrValue: `/users/${this.author.name}`,
      },
      profileImg: {
        type: "attribute",
        attrName: "src",
        attrValue: avatar,
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

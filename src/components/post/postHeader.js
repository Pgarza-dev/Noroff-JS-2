import postHeader from "./postHeader.html?raw";
import { CustomComponent } from "../customComponent.js";
import { getActiveUser } from "@/lib/utils/handleLocalStorageUser";

export class PostHeader extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   */
  constructor(postData) {
    super();
    this.postData = postData;
  }

  connectedCallback() {
    this.innerHTML = postHeader;

    const avatar = this.postData.author.avatar || "/images/default_user.png";

    this.populateData({
      author: this.postData.author.name,
      time: this.formatDateFromNow(this.postData.created),
      authorLink: {
        type: "attribute",
        attrName: "href",
        attrValue: `/user/?username=${this.postData.author.name}`,
      },
      profileImg: {
        type: "attribute",
        attrName: "src",
        attrValue: avatar,
      },
    });
    this.addEventListeners();
    this.displayMenuBtnIfAuthorIsLoggedInUser();
  }

  addEventListeners() {
    this.onClick("postMenuBtn", this.togglePostMenu);
    this.onClick("editPostBtn", this.handleEditPost);
    this.onClick("deletePostBtn", this.handleDeletePost);
    this.clickedOutside("postMenuDropdown", this.hideMenuOnOutsideClick);
  }

  displayMenuBtnIfAuthorIsLoggedInUser() {
    const activeUser = getActiveUser();

    if (activeUser && activeUser === this.postData.author.name) {
      this.getSlot("postMenuBtn").classList.remove("hidden");
    }
  }

  togglePostMenu = (event) => {
    this.toggleHidden(this.getSlot("postMenuDropdown"));
    event.stopPropagation();
  };

  hideMenuOnOutsideClick = () => {
    this.hideElement(this.getSlot("postMenuDropdown"));
  };

  handleEditPost = () => {
    document.querySelector(
      "#post-editor-textarea",
    ).value = `${this.postData.body}`;

    document.querySelector(
      "#post-editor-post-id",
    ).value = `${this.postData.id}`;
  };
}

customElements.define("post-header", PostHeader);

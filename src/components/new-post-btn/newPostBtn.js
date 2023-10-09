import { CustomComponent } from "../customComponent.js";
import newPostBtn from "./newPostBtn.html?raw";

export class NewPostBtn extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = newPostBtn;
  }

  connectedCallback() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.onClick("newPostBtn", this.handleNewPostBtnClick);
  }

  handleNewPostBtnClick = () => {
    this.dispatchCustomEvent({
      eventName: "addPostBtnClick",
    });
  };
}

customElements.define("new-post-btn", NewPostBtn);

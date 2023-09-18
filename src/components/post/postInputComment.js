import PostInputCommentHtml from "./PostInputComment.html?raw";
import { CustomComponent } from "../customComponent.js";

export class PostInputComment extends CustomComponent {
  constructor(postData) {
    super();
    this.postData = postData;
  }

  connectedCallback() {
    this.classList.add("hidden");
    this.innerHTML = PostInputCommentHtml;
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener("submit", this.handleSubmitComment);

    this.onCustomEvent({
      eventName: "addComment",
      id: this.postData.id,
      useDocument: true,
      callback: () => this.showCommentInput(),
    });
  }

  showCommentInput() {
    this.classList.remove("hidden");
    this.inputCommentField = this.getSlot("commentField").focus();
  }

  getInputCommentField() {
    return this;
  }

  handleTagUser = () => {
    // TODO: Add functionality to tag users, this is just a placeholder

    this.inputCommentField.addEventListener("keyup", (event) => {
      const commentValue = event.target.innerText.trim();

      const usernameRegex = /@(\w+)/g;
      let match;

      while ((match = usernameRegex.exec(commentValue)) !== null) {
        console.log(match[1]);
      }
    });
  };

  handleSubmitComment = (event) => {
    event.preventDefault();

    const commentField = this.getSlot("commentField");

    const commentValue = commentField.value.trim();

    if (commentValue) {
      const newComment = {
        author: this.postData.author.name, // TODO: Replace with active user!
        body: commentValue,
        created: Date.now(),
      };

      commentField.value = "";

      this.dispatchCustomEvent({
        eventName: "addCommentOptimistically",
        id: this.postData.id,
        detail: newComment,
      });

      // const commentElement = new PostComment(
      //   newComment.author,
      //   newComment.body,
      //   newComment.created,
      //   this,
      // );

      // if (this.commentsContainer.classList.contains("hidden")) {
      //   this.commentsContainer.classList.remove("hidden");
      // }

      // this.populateSlot("comments", commentElement);
    }
  };
}

customElements.define("post-input-comment", PostInputComment);

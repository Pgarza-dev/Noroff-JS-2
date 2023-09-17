import PostInputCommentHtml from "./PostInputComment.html?raw";
import { CustomComponent } from "../customComponent.js";

export class PostInputComment extends CustomComponent {
  constructor(author, created) {
    super();
    this.author = author;
    this.created = created;
  }

  connectedCallback() {
    this.innerHTML = PostInputCommentHtml;

    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener("submit", this.handleSubmitComment);
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
        author: this.author,
        body: commentValue,
        created: Date.now(),
      };

      console.log(commentValue);

      commentField.value = "";

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

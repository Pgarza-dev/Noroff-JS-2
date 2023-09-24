import PostInputCommentHtml from "./PostInputComment.html?raw";
import { CustomComponent } from "../customComponent.js";

export class PostInputComment extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   * @param {Store} store - The store to use for the component.
   */
  constructor(postData, store) {
    super();
    this.postData = postData;
    this.store = store;
  }

  connectedCallback() {
    this.classList.add("hidden");
    this.innerHTML = PostInputCommentHtml;
    this.addEventListeners();

    this.inputOpenUnsubscribe = this.store.subscribe(
      (state) => this.setCommentInputOpen(state),
      "commentInputOpen",
    );

    this.commentsOpenUnsubscribe = this.store.subscribe(
      (state) => this.toggleComments(state.commentsOpen),
      "commentsOpen",
    );
  }

  disconnectedCallback() {
    this.inputOpenUnsubscribe();
  }

  setCommentInputOpen(isOpen) {
    console.log(isOpen);
    isOpen ? this.handleOpen() : this.classList.add("hidden");
  }

  handleOpen() {
    this.classList.remove("hidden");
    this.getSlot("commentField").focus();
  }

  addEventListeners() {
    this.addEventListener("submit", this.handleSubmitComment);
    this.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        this.handleSubmitComment(event);
      }
    });

    this.onCustomEvent({
      eventName: "replyToComment",
      id: this.postData.id,
      useDocument: true,
      callback: (event) => this.handleReplyToComment(event),
    });

    this.handleExpandTextField();
  }

  getInputCommentField() {
    return this;
  }

  toggleComments = (commentsOpen) => {
    commentsOpen
      ? this.classList.remove("hidden")
      : this.classList.add("hidden");
  };

  handleExpandTextField = () => {
    const textarea = this.getSlot("commentField");
    textarea.style.height = `${textarea.height}px`;

    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = `${this.scrollHeight}px`;
    });
  };

  handleReplyToComment = (event) => {
    this.classList.remove("hidden");
    this.getSlot("commentField").focus();
    this.getSlot("commentField").value = `@${event.detail.author.name} `;
  };

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
    commentField.style.height = "auto";

    const commentValue = commentField.value.trim();

    if (commentValue) {
      const newComment = {
        author: this.postData.author, // TODO: Replace with active user!
        body: commentValue,
        created: Date.now(),
      };

      commentField.value = "";

      this.dispatchCustomEvent({
        eventName: "addCommentOptimistically",
        id: this.postData.id,
        detail: newComment,
      });
    }
  };
}

customElements.define("post-input-comment", PostInputComment);

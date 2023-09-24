import PostInputCommentHtml from "./PostInputComment.html?raw";
import { CustomComponent } from "../customComponent.js";

export class PostInputComment extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API.
   * @param {Store} store - The store to use for the component.
   */
  constructor(postData, store) {
    super();
    this.postData = postData;
    this.store = store;
    this.inputOpenUnsubscribe = null;
  }

  connectedCallback() {
    this.initComponent();
    this.subscribeToStore();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.unsubscribeFromStore();
  }

  initComponent() {
    this.classList.add("transition-height");
    this.innerHTML = PostInputCommentHtml;
  }

  subscribeToStore() {
    this.inputOpenUnsubscribe = this.store.subscribe(
      (state) => this.toggleInputField(state),
      "commentInputOpen",
    );
  }

  unsubscribeFromStore() {
    if (this.inputOpenUnsubscribe) this.inputOpenUnsubscribe();
  }

  toggleInputField(isOpen) {
    isOpen
      ? this.openInputField()
      : this.getSlot("inputCommentForm").setAttribute("aria-expanded", "false");
  }

  openInputField() {
    this.getSlot("inputCommentForm").setAttribute("aria-expanded", "true");
    this.focusInputField();
  }

  focusInputField() {
    this.getSlot("commentField").focus();
  }

  addEventListeners() {
    this.addSubmitListener();
    this.addEnterKeyListener();
    this.addReplyToCommentListener();
    this.addExpandTextFieldListener();
    this.handleFocusCommentInput();
  }

  addSubmitListener() {
    this.addEventListener("submit", this.handleSubmit);
  }

  addEnterKeyListener() {
    this.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        this.handleSubmit(event);
      }
    });
  }

  addReplyToCommentListener() {
    this.onCustomEvent({
      eventName: "replyToComment",
      id: this.postData.id,
      useDocument: true,
      callback: (event) => this.handleReplyToComment(event),
    });
  }

  addExpandTextFieldListener() {
    const textarea = this.getSlot("commentField");
    textarea.style.height = `${textarea.height}px`;
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = `${this.scrollHeight}px`;
    });
  }

  handleFocusCommentInput() {
    this.onCustomEvent({
      eventName: "focusCommentInput",
      id: this.postData.id,
      useDocument: true,
      callback: () => this.focusInputField(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const commentField = this.getSlot("commentField");
    const comment = commentField.value.trim();
    if (comment) {
      this.addNewComment(comment);
      commentField.value = "";
    }
    this.store.setState(() => ({
      commentsOpen: true,
    }));
    commentField.blur();
  }

  handleReplyToComment(event) {
    this.openInputField();
    const commentField = this.getSlot("commentField");
    commentField.value = `@${event.detail.author.name} `;
  }

  addNewComment(comment) {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    const newComment = {
      author: { name: username, avatar: avatar },
      body: comment,
      created: Date.now(),
    };

    this.store.setState((currentState) => ({
      comments: [...currentState.comments, newComment],
    }));

    // TODO: Add API call to add comment to post. @Pgarza-dev
  }
}

customElements.define("post-input-comment", PostInputComment);

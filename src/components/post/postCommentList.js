import { CustomComponent } from "../customComponent.js";
import { PostComment } from "./postComment.js";

export class PostCommentList extends CustomComponent {
  constructor(comments) {
    super();
    this.comments = comments;
  }

  connectedCallback() {
    console.log(this.setPostComments());
    this.innerHTML = this.setPostComments();
    this.addEventListeners();
  }

  addEventListeners() {}

  setPostComments() {
    return this.comments.reduce((acc, comment) => {
      const commentElement = new PostComment(
        comment.author.name,
        comment.body,
        comment.created,
      );
      acc.push(commentElement);
      return acc;
    }, []);
  }
}

customElements.define("post-comment-list", PostCommentList);

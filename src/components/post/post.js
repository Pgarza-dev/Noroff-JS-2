import { CustomComponent } from "../customComponent.js";
import postHtml from "./post.html?raw";
import { PostButtons } from "./postButtons.js";
import { PostCommentList } from "./postCommentList";
import { PostHeader } from "./postHeader.js";
import { PostInputComment } from "./postInputComment.js";

export class Post extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   */
  constructor(postData) {
    super();
    this.postData = postData;
  }

  connectedCallback() {
    this.innerHTML = postHtml;

    this.populateData({
      postHeader: this.setPostHeader(),
      postBody: this.setPostBody(),
      postButtons: this.setPostButtons(),
      postCommentList: this.setPostCommentList(),
      inputComment: this.setPostInputComment(),
    });
  }

  setPostHeader() {
    return new PostHeader(this.postData.author, this.postData.created);
  }

  setPostBody() {
    return this.postData.body || ""; // TODO: Add support for images
  }

  setPostButtons() {
    return new PostButtons(this.postData);
  }

  setPostCommentList() {
    const postCommentList = new PostCommentList(this.postData);

    return postCommentList.getCommentElements();
  }

  setPostInputComment() {
    const postInputComment = new PostInputComment(this.postData);
    return postInputComment.getInputCommentField();
  }
}

customElements.define("app-post", Post);

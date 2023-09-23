import { CustomComponent } from "../customComponent.js";
import postHtml from "./post.html?raw";
import { PostButtons } from "./postButtons.js";
import { PostCommentList } from "./postCommentList";
import { PostHeader } from "./postHeader.js";
import { PostInputComment } from "./postInputComment.js";

export class Post extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   * @param {currentUser} string - The current user's username.
   */
  constructor(postData, currentUser) {
    super();
    this.postData = postData;
    this.currentUser = currentUser;
  }

  connectedCallback() {
    this.innerHTML = postHtml;

    this.populateData({
      postHeader: this.setPostHeader(),
      postBody: this.setPostBody(),
      postMedia: this.setPostMedia(),
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

  setPostMedia() {
    if (this.postData.media) {
      const image = document.createElement("img");
      image.src = this.postData.media;
      image.alt = `${this.postData.author.name} posted an image with the title ${this.postData.title}.`;
      image.classList.add("post-media");
      return image;
    }
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

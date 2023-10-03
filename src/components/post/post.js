import { CustomComponent } from "../customComponent.js";
import postHtml from "./post.html?raw";
import { PostButtons } from "./postButtons.js";
import { PostCommentList } from "./postCommentList";
import { PostHeader } from "./postHeader.js";
import { PostInputComment } from "./postInputComment.js";
import { Store } from "@lib/stores/store.js";
import "@lib/services/posts.js"; // to get vscode to pick up the jsdoc types
import { PostMedia } from "./postMedia.js";

export class Post extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   * @param {currentUser} string - The current user's username.
   */
  constructor(postData, currentUser) {
    super();
    this.postData = postData;
    this.store = new Store({
      commentsOpen: false,
      commentInputOpen: false,
      comments: [...(this.postData.comments || [])],
      reactions: [...(this.postData.reactions || [])],
    });
  }

  connectedCallback() {
    this.innerHTML = postHtml;

    this.populateData({
      postHeader: new PostHeader(this.postData),
      postTitle: this.postData.title || "",
      postBody: this.postData.body || "",
      postMedia: new PostMedia(this.postData),
      postButtons: new PostButtons(this.store, this.postData.id),
      postCommentList: new PostCommentList(this.postData, this.store),
      inputComment: new PostInputComment(this.postData, this.store),
    });
  }
}

customElements.define("app-post", Post);

import postHtml from "./post.html?raw";
import { CustomComponent } from "../customComponent.js";
import { PostHeader } from "./postHeader.js";
import { PostButtons } from "./postButtons.js";
import { PostComment } from "./postComment.js";
import { PostInputComment } from "./postInputComment.js";
import { PostCommentList } from "./postCommentList";

const postsData = [
  {
    title: "Example of XSS",
    body: '<img src="fake.jpg" onerror="console.error(\'Note: This script is not harmful. It shows an XSS risk. XSS can steal info or redirect users. Always sanitize data before using innerHTML.\');" />',
    tags: [],
    media: null,
    reactions: [
      {
        symbol: "👍",
        count: 1,
        postId: 820,
      },
      {
        symbol: "❤️",
        count: 1,
        postId: 820,
      },
    ],
    comments: [
      {
        body: "werere",
        replyToId: null,
        id: 103,
        postId: 820,
        owner: "PabloGarza",
        created: "2023-09-10T14:30:46.406Z",
        author: {
          name: "PabloGarza",
          email: "pabgar91211@stud.noroff.no",
          avatar: null,
          banner: null,
        },
      },
      {
        body: "This is a comment!",
        replyToId: null,
        id: 123,
        postId: 820,
        owner: "kyrregjerstad",
        created: "2023-09-15T16:38:36.859Z",
        author: {
          name: "kyrregjerstad",
          email: "kyrgje24554@stud.noroff.no",
          avatar: null,
          banner: null,
        },
      },
    ],
    created: "2023-09-10T14:00:33.457Z",
    updated: "2023-09-12T21:10:59.509Z",
    id: 820,
    author: {
      name: "kyrregjerstad",
      email: "kyrgje24554@stud.noroff.no",
      avatar: "",
      banner: null,
    },
    _count: {
      comments: 2,
      reactions: 2,
    },
  },
];

/**
 * Represents a reaction on a post.
 * @typedef {Object} Reaction
 * @property {string} symbol - The symbol for the reaction (e.g., "👍").
 * @property {number} count - The count of this reaction.
 * @property {number} postId - The ID of the associated post.
 */

/**
 * Represents an author of a comment or post.
 * @typedef {Object} Author
 * @property {string} name - The name of the author.
 * @property {string} email - The email of the author.
 * @property {?string} avatar - The URL to the avatar image.
 * @property {?string} banner - The URL to the banner image.
 */

/**
 * Represents a comment on a post.
 * @typedef {Object} Comment
 * @property {string} body - The body text of the comment.
 * @property {?number} replyToId - The ID of the comment to which this is a reply.
 * @property {number} id - The ID of the comment.
 * @property {number} postId - The ID of the associated post.
 * @property {string} owner - The username of the comment owner.
 * @property {string} created - The creation date in ISO 8601 format.
 * @property {Author} author - The author of the comment.
 */

/**
 * Represents a post. Expects the _comments, _reactions and _author flags in the API call to be set to true
 * @typedef {Object} PostData
 * @property {string} title - The title of the post.
 * @property {string} body - The body text of the post.
 * @property {string[]} tags - The tags associated with the post.
 * @property {?string} media - The URL to any associated media.
 * @property {Reaction[]} reactions - The reactions to the post.
 * @property {Comment[]} comments - The comments on the post.
 * @property {string} created - The creation date in ISO 8601 format.
 * @property {?string} updated - The last updated date in ISO 8601 format.
 * @property {number} id - The ID of the post.
 * @property {Author} author - The author of the post.
 * @property {Object} _count - Miscellaneous counts.
 * @property {number} _count.comments - The total number of comments.
 * @property {number} _count.reactions - The total number of reactions.
 */
class Post extends CustomComponent {
  /**
   * @param {PostData} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
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
      commentField: this.setPostInputComment(),
    });
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener("submit", this.handleSubmitComment);

    this.onCustomEvent({
      eventName: "toggleComments",
      id: this.postData.id,
      callback: () => this.toggleComments(),
    });

    this.onCustomEvent({
      eventName: "addComment",
      id: this.postData.id,
      callback: () => this.displayCommentField(),
    });
  }

  //using getters to always get the latest version of the DOM element
  get commentsContainer() {
    return this.getSlot("comments");
  }

  get inputCommentField() {
    return this.getSlot("input-comment-form");
  }

  commentsOpen = false;
  toggleComments = () => {
    if (!this.commentsOpen) {
      this.displayElement(this.commentsContainer);
      this.displayElement(this.inputCommentField);
    } else {
      this.hideElement(this.commentsContainer);
      this.hideElement(this.inputCommentField);
    }
    this.commentsOpen = !this.commentsOpen;
  };

  commentFieldOpen = false;
  displayCommentField = () => {
    if (!this.commentFieldOpen) {
      this.displayElement(this.inputCommentField);
    } else {
      this.hideElement(this.inputCommentField);
    }
    this.inputCommentField.focus();
  };

  setPostHeader() {
    return new PostHeader(this.postData.author.name, this.postData.created);
  }

  setPostBody() {
    return this.postData.body;
  }

  setPostButtons() {
    return new PostButtons(
      this,
      this.postData._count.comments,
      this.postData._count.reactions,
      this.postData.id,
    );
  }

  setPostCommentList() {
    console.log(new PostCommentList(this.postData.comments));
    return new PostCommentList(this.postData.comments);
  }

  setPostInputComment() {
    return new PostInputComment(this.postData.author.name);
  }
}

customElements.define("app-post", Post);

const postsSection = document.querySelector("#posts");
postsData.forEach((postData) => {
  postsSection.appendChild(new Post(postData));
});

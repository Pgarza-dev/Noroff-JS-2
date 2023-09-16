import postHtml from "./post.html?raw";
import postCommentHtml from "./postComment.html?raw";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

class PostComment extends HTMLElement {
  constructor(author = "", body = "", date = "", parentEl = null) {
    super();
    this.author = author;
    this.body = body;
    this.date = date;
    this.root = parentEl;
  }

  connectedCallback() {
    this.innerHTML = postCommentHtml;
    this.classList.add(
      "border-b",
      "border-opacity-10",
      "border-white",
      "last:border-none",
    );

    this.setCommentBody(this.body);
    this.setCommentAuthor(this.author);
    this.setCommentDate(this.date);
    this.setAuthorLink(this.author);
    this.setTimeCreated(this.date);
    this.handleReplyToCommentBtnClick(this.author);
  }

  setCommentBody(body) {
    this.querySelector("#comment-body").textContent = body;
  }

  setCommentAuthor(author) {
    this.querySelector("#author").textContent = author;
  }

  setCommentDate(date) {
    this.querySelector("#date").textContent = dayjs(date).fromNow();
  }

  setTimeCreated(date) {
    this.querySelector("#time").textContent = dayjs(date).format("HH:mm");
  }

  setAuthorLink(author) {
    this.querySelector("#author-link").href = `/users/${author}`;
  }

  handleReplyToCommentBtnClick = (author) => {
    const replyToCommentBtn = this.querySelector("#reply-to-comment-btn");

    replyToCommentBtn.addEventListener("click", () => {
      const inputCommentField = this.root.querySelector("#commentField");

      if (inputCommentField.classList.contains("hidden")) {
        inputCommentField.classList.remove("hidden");
      }

      inputCommentField.querySelector.focus();
      inputCommentField.querySelector.value = `@${author} `;
    });
  };
}

customElements.define("post-comment", PostComment);
const commentsData = [
  {
    body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Exercitationem eaque sapiente minus quos alias similique
    necessitatibus inventore perspiciatis temporibus, maiores
    assumenda vero harum aperiam optio distinctio. Eos animi
    enim ad?`,
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
];

const postData = [
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

class Post extends HTMLElement {
  constructor(
    author = "Test",
    body = "Hello world!",
    created = "2023-09-10T14:00:33.457Z",
  ) {
    super();
    this.author = author;
    this.body = body;
    this.created = created;
  }

  connectedCallback() {
    this.innerHTML = postHtml;

    this.queryDomElements();
    this.populateData();
    this.addEventListeners();
  }

  queryDomElements() {
    this.commentsContainer = this.querySelector("#comments");
    this.postBody = this.querySelector("#post-body");
    this.postUsername = this.querySelector("#author");
    this.commentCount = this.querySelector("#view-comments-btn");
    this.reactionsCount = this.querySelector("#view-reactions-btn");
    this.dateCreated = this.querySelector("#date");
    this.timeCreated = this.querySelector("#time");
    this.authorLink = this.querySelector("#author-link");
    this.postMenuBtn = this.querySelector("#post-menu-btn");
    this.postMenu = this.querySelector("#post-menu-dropdown");
    this.viewCommentsBtn = this.querySelector("#view-comments-btn");
    this.addCommentBtn = this.querySelector("#add-comment-btn");
    this.inputCommentField = this.querySelector("#input-comment-form");
  }

  populateData() {
    this.setPostBody(this.body);
    this.setPostUsername(this.author);
    this.setDateCreated(this.created);
    this.setTimeCreated(this.created);
    this.setAuthorLink(this.author);
    this.setCommentCount(commentsData.length);
    this.setReactionsCount(0);

    commentsData.forEach((comment) => {
      const commentElement = new PostComment(
        comment.author.name,
        comment.body,
        comment.created,
      );
      this.commentsContainer.appendChild(commentElement);
    });
  }

  addEventListeners() {
    this.addEventListener("submit", this.handleSubmitComment);
    this.handleViewCommentsBtnClick();
    this.handleAddCommentBtnClick();
    this.handlePostMenuBtnClick();
    this.handleTagUser();
  }

  setPostBody(body) {
    this.postBody.textContent = body;
  }

  setPostUsername(author) {
    this.postUsername.textContent = author;
  }

  setCommentCount(count) {
    this.commentCount.textContent = count;
  }

  setReactionsCount(count) {
    this.reactionsCount.textContent = count;
  }

  setDateCreated(date) {
    this.dateCreated.textContent = dayjs(date).fromNow();
  }

  setTimeCreated(date) {
    this.timeCreated.textContent = dayjs(date).format("HH:mm");
  }

  setAuthorLink(author) {
    this.authorLink.href = `/users/${author}`;
  }

  handlePostMenuBtnClick = () => {
    this.postMenuBtn.addEventListener("click", (event) => {
      this.postMenu.classList.toggle("hidden");

      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (
        !this.postMenu.contains(event.target) &&
        !this.postMenuBtn.contains(event.target)
      ) {
        this.postMenu.classList.add("hidden");
      }
    });

    // Removes event listener when component is removed from DOM
    this.addEventListener("disconnectedCallback", () => {
      document.removeEventListener("click", handlePostMenuBtnClick);
    });
  };

  handleViewCommentsBtnClick = () => {
    this.viewCommentsBtn.addEventListener("click", () => {
      if (this.commentsContainer.classList.contains("hidden")) {
        this.commentsContainer.classList.remove("hidden");
        this.inputCommentField.classList.remove("hidden");
      } else {
        this.commentsContainer.classList.add("hidden");
        this.inputCommentField.classList.add("hidden");
      }
    });
  };

  handleAddCommentBtnClick = () => {
    this.addCommentBtn.addEventListener("click", () => {
      if (this.inputCommentField.classList.contains("hidden")) {
        this.inputCommentField.classList.remove("hidden");
      }

      this.inputCommentField.querySelector("#commentField").focus();
    });
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

    const commentValue = this.inputCommentField.innerText.trim();

    if (commentValue) {
      const newComment = {
        author: this.author,
        body: commentValue,
        created: Date.now(),
      };

      // this.inputCommentField.textContent = "";

      const commentElement = new PostComment(
        newComment.author,
        newComment.body,
        newComment.created,
        this,
      );

      if (this.commentsContainer.classList.contains("hidden")) {
        this.commentsContainer.classList.remove("hidden");
      }

      this.querySelector("#comments").appendChild(commentElement);
    }
  };
}

customElements.define("app-post", Post);

const postsSection = document.querySelector("#posts");
postData.forEach((post) => {
  postsSection.appendChild(new Post(post.author.name, post.body, post.created));
});

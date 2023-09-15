import postHtml from "./post.html?raw";
import postCommentHtml from "./postComment.html?raw";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

class PostComment extends HTMLElement {
  constructor(author = "", body = "", date = "") {
    super();
    this.author = author;
    this.body = body;
    this.date = date;
  }

  connectedCallback() {
    this.innerHTML = postCommentHtml;
    this.setCommentBody(this.body);
    this.setCommentAuthor(this.author);
    this.setCommentDate(this.date);
    this.setAuthorLink(this.author);
    this.setTimeCreated(this.date);
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
    this.addEventListener("submit", this.handleSubmitComment);
  }

  connectedCallback() {
    this.innerHTML = postHtml;

    const commentsContainer = this.querySelector("#comments");

    commentsData.forEach((comment) => {
      const commentElement = new PostComment(
        comment.author.name,
        comment.body,
        comment.created,
      );
      commentsContainer.appendChild(commentElement);
    });

    this.setPostBody(this.body);
    this.setPostUsername(this.author);
    this.setDateCreated(this.created);
    this.setTimeCreated(this.created);
    this.setAuthorLink(this.author);
    this.setCommentCount(commentsData.length);
    this.setReactionsCount(0);
  }

  setPostBody(body) {
    this.querySelector("#post-body").textContent = body;
  }

  setPostUsername(author) {
    this.querySelector("#author").textContent = author;
  }

  setCommentCount(count) {
    this.querySelector("#view-comments-btn").textContent = count;
  }

  setReactionsCount(count) {
    this.querySelector("#view-reactions-btn").textContent = count;
  }

  setDateCreated(date) {
    this.querySelector("#date").textContent = dayjs(date).fromNow();
  }

  setTimeCreated(date) {
    this.querySelector("#time").textContent = dayjs(date).format("HH:mm");
  }

  setAuthorLink(author) {
    this.querySelector("#author-link").href = `/users/${author}`;
  }

  handleSubmitComment = (event) => {
    event.preventDefault();
    const commentTextarea = this.querySelector("textarea");
    const commentValue = commentTextarea.value.trim();

    if (commentValue) {
      const newComment = {
        author: this.author,
        body: commentValue,
        created: Date.now(),
      };

      commentTextarea.value = "";

      const commentElement = new PostComment(
        newComment.author,
        newComment.body,
        newComment.created,
      );
      this.querySelector("#comments").appendChild(commentElement);
    }
  };
}

customElements.define("app-post", Post);

const postsSection = document.querySelector("#posts");
postData.forEach((post) => {
  postsSection.appendChild(new Post(post.author.name, post.body, post.created));
});

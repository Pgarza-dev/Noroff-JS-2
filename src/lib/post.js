const comments = [
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

const post = document.querySelector("#post");
const commentSection = document.querySelector("#comments");

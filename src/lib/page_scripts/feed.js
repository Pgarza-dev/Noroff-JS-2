import { Post } from "@components/post/post.js";
import { createFormDataObject } from "@lib/forms/utils";
import { createPost, getAllPosts } from "../services/posts.js";
import { postStore } from "../stores/postStore.js";

const postInput = document.getElementById("post-input");
const postsSection = document.querySelector("#posts");

async function initPostStore() {
  const postsData = await getAllPosts();
  postStore.setState(() => ({ posts: postsData }));
}

function subscribeToPostStore(renderFeed) {
  return postStore.subscribe((newState) => {
    renderFeed(newState);
  }, "posts");
}

function renderFeed(postsData) {
  postsSection.innerHTML = "";

  postsData.forEach((postData) => {
    postsSection.appendChild(new Post(postData));
  });
}

postInput.addEventListener("submit", createNewFeedPost);

async function createNewFeedPost(event) {
  event.preventDefault();
  const form = createFormDataObject(event.target);

  const response = await createPost(form);

  postStore.setState((state) => ({
    posts: [response, ...state.posts],
  }));
  postInput.hidePopover();
}

async function initPage() {
  await initPostStore();

  const initialPosts = postStore.getState((state) => state.posts);
  renderFeed(initialPosts);

  subscribeToPostStore(renderFeed);
}

initPage();

console.log("feed.js loaded");

import { Post } from "@components/post/post.js";
import { createFormDataObject } from "@lib/forms/utils";
import { createPost, getAllPosts } from "../services/posts.js";
import { postStore } from "../stores/postStore.js";
import { getFollowersPosts } from "../services/posts.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";

const postInput = document.getElementById("post-input");
const postsSection = document.getElementById("posts");
const filterPostSelect = document.getElementById("filter-posts-select");
const allPosts = document.getElementById("oldest-posts-feed");

async function initPostStore() {
  const postsData = await getAllPosts();
  postStore.setState(() => ({ posts: postsData }));

  console.log("postStore", postStore.getState());
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

filterPostSelect.addEventListener("change", filterPostsHandler);

function filterPostsHandler(event) {
  console.log(event.target.value);
  if (event.target.value === "following") {
    friendsOnlyFeedHandler();
    console.log("filterPostsHandler", event.target.value);
  } else if (event.target.value === "all-posts") {
    renderFeed(postStore.getState((state) => state.posts));
    console.log("filterPostsHandler", event.target.value);
  }
}

async function friendsOnlyFeedHandler() {
  const username = getUsernameQueryParam();
  const postsData = await getFollowersPosts(username);
  console.log(postsData);

  renderFeed(postsData);
}

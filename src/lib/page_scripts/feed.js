console.log("feed.js loaded");

import { sortPostsHandler } from "@/lib/utils/sortPosts.js";
import { Post } from "@components/post/post.js";
import { createFormDataObject } from "@lib/forms/utils";
import {
  createPost,
  getAllPosts,
  getFollowersPosts,
} from "../services/posts.js";
import { postStore } from "../stores/postStore.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";

const postInput = document.getElementById("post-input");
const postsSection = document.getElementById("posts");
const filterPostSelect = document.getElementById("filter-posts-select");
const sortBySelect = document.getElementById("sort-by-select");

initPage();

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

async function createNewFeedPost(event) {
  event.preventDefault();
  const form = createFormDataObject(event.target);
  postInput.hidePopover();
  await createPost(form);
}

async function initPage() {
  await initPostStore();
  const initialPosts = postStore.getState((state) => state.posts);
  renderFeed(initialPosts);
  subscribeToPostStore(renderFeed);
}

filterPostSelect.addEventListener("change", filterPostsHandler);
postInput.addEventListener("submit", createNewFeedPost);

sortBySelect.addEventListener("change", () => {
  const postsData = postStore.getState((state) => state.posts);
  const sortedPosts = sortPostsHandler(postsData, sortBySelect);
  renderFeed(sortedPosts);
});

function filterPostsHandler(event) {
  const filterBy = event.target.value;

  switch (filterBy) {
    case "following":
      friendsOnlyFeedHandler();
      break;
    case "all-posts":
      everyoneFeedHandler();
      break;
    default:
      everyoneFeedHandler();
  }
}

async function friendsOnlyFeedHandler() {
  const username = getUsernameQueryParam();
  const postsData = await getFollowersPosts(username);
  const sortedPosts = sortPostsHandler(postsData, sortBySelect);
  postStore.setState(() => ({ posts: sortedPosts }));
}

async function everyoneFeedHandler() {
  const postsData = await getAllPosts();
  const sortedPosts = sortPostsHandler(postsData, sortBySelect);
  postStore.setState(() => ({ posts: sortedPosts }));
}

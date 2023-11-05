import { createFormDataObject } from "@lib/forms/utils";
import { Post } from "../../components/post/post.js";
import { createPost, getProfilePosts } from "../services/posts.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";

import { postStore } from "../stores/postStore.js";

const newPostForm = document.getElementById("new-post-form");

const profilePostsSection = document.getElementById("profile-posts");

export async function createNewPost(event) {
  event.preventDefault();
  const postFormObj = createFormDataObject(newPostForm);
  const newPost = await createPost(postFormObj);

  postStore.setState((currentState) => ({
    posts: [newPost, ...currentState.posts],
  }));
}

async function initPostStore() {
  const username = getUsernameQueryParam();
  const postsData = await getProfilePosts(username);
  postStore.setState(() => ({ posts: postsData }));
}

function subscribeToPostStore(renderFeed) {
  return postStore.subscribe((newState) => {
    renderFeed(newState);
  }, "posts");
}

function renderPosts(postsData) {
  profilePostsSection.innerHTML = "";

  postsData.forEach((postData) => {
    profilePostsSection.appendChild(new Post(postData));
  });
}

export async function initUserPage() {
  await initPostStore();

  const initialPosts = postStore.getState((state) => state.posts);

  renderPosts(initialPosts);

  subscribeToPostStore(renderPosts);
}

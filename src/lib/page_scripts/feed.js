import { getAllPosts } from "../services/posts.js";
import { Post } from "@components/post/post.js";
import { postStore } from "../stores/postStore.js";

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
  const postsSection = document.querySelector("#posts");
  postsSection.innerHTML = "";

  postsData.forEach((postData) => {
    postsSection.appendChild(new Post(postData));
  });
}

async function initPage() {
  await initPostStore();

  const initialPosts = postStore.getState((state) => state.posts);
  renderFeed(initialPosts);

  subscribeToPostStore(renderFeed);
}

initPage();

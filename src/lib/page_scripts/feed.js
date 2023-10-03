import { getAllPosts } from "../services/posts.js";
import { Post } from "../../components/post/post.js";
import { postStore } from "../stores/postStore.js";
import { createPost } from "../services/posts.js";
import { createFormDataObject } from "@lib/forms/utils";

const postInput = document.getElementById("post-input");

const postsSection = document.querySelector("#posts");
async function renderFeed() {
  const postsData = await getAllPosts();
  postStore.setState(() => ({ posts: postsData }));

  postsData.forEach((postData) => {
    postsSection.appendChild(new Post(postData));
  });
}

renderFeed();

postInput.addEventListener("submit", createNewFeedPost);

async function createNewFeedPost(event) {
  event.preventDefault();
  const form = createFormDataObject(event.target);

  const response = await createPost(form);
  postsSection.prepend(new Post(response));
  postInput.hidePopover();
}

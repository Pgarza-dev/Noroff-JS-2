// add all user functions here
import { createPost } from "../services/posts.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";
import { createFormDataObject } from "@lib/forms/utils";
import { getProfilePosts } from "../services/posts.js";
import { Post } from "../../components/post/post.js";

const newPostDiv = document.getElementById("new-post");
const newPostForm = document.getElementById("new-post-form");
const createPostPlusIcon = document.getElementById("create-post-plus-icon");
const createPostMinusIcon = document.getElementById("create-post-minus-icon");
const profilePostsSection = document.getElementById("profile-posts");

export async function createNewPost(event) {
  event.preventDefault();
  const form = createFormDataObject(newPostForm);
  try {
    const response = await createPost(form);

    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `<p>${response.title}</p><p>${response.body}</p>`;
    newPostDiv.appendChild(postDiv);
  } catch (error) {
    console.error(error);
  }
}

export async function displayAllUserPosts() {
  const username = getUsernameQueryParam();
  const posts = await getProfilePosts(username);

  posts.forEach((post) => {
    profilePostsSection.appendChild(new Post(post));
  });
}

console.log("createPosts.js");
import { API_BASE_URL } from "../constants.js";
import { createPost } from "../services/posts.js";
import { getAllPosts } from "../services/posts.js";
import { createFormDataObject } from "@lib/forms/utils";
import { getProfilePosts } from "../services/posts.js";
import { Post } from "../../components/post/post.js";
import { editProfile } from "../utils/editProfile.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";

const myPostUrl = `${API_BASE_URL}/social/posts?_author=true&_comments=true&_reactions=true`;
const createPostButton = document.getElementById("create-post-button");
const newPostForm = document.getElementById("new-post-form");
const newPostDiv = document.getElementById("new-post");
const createPostPlusIcon = document.getElementById("create-post-plus-icon");
const createPostMinusIcon = document.getElementById("create-post-minus-icon");
const cancelPostButton = document.getElementById("cancel-post-button");

createPostButton.addEventListener("click", displayInput);

createPostButton.addEventListener("click", () => {
  createPostButton.classList.add("theCard");
  createPostButton.classList.add("flip");
});

newPostForm.addEventListener("submit", createNewPost);

editProfile();

async function createNewPost(event) {
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

function displayInput() {
  newPostForm.classList.remove("hidden");
  createPostPlusIcon.classList.add("hidden");
  createPostMinusIcon.classList.remove("hidden");
}

const profilePostsSection = document.getElementById("profile-posts");
async function main() {
  const username = getUsernameQueryParam();
  const posts = await getProfilePosts(username);

  posts.forEach((post) => {
    profilePostsSection.appendChild(new Post(post));
  });
}

main();

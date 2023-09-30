console.log("createPosts.js");
import { API_BASE_URL } from "../constants.js";
import { getAllPosts } from "../services/posts.js";
import { editProfile } from "../utils/editProfile.js";

import { createNewPost } from "../utils/profilePageUtils.js";
import { displayAllUserPosts } from "../utils/profilePageUtils.js";

const myPostUrl = `${API_BASE_URL}/social/posts?_author=true&_comments=true&_reactions=true`;
const createPostButton = document.getElementById("create-post-button");
const newPostForm = document.getElementById("new-post-form");
const createPostPlusIcon = document.getElementById("create-post-plus-icon");
const createPostMinusIcon = document.getElementById("create-post-minus-icon");
const cancelPostButton = document.getElementById("cancel-post-button");

createPostButton.addEventListener("click", displayInput);

createPostButton.addEventListener("click", () => {
  createPostButton.classList.add("theCard");
  createPostButton.classList.add("flip");
});

function displayInput() {
  newPostForm.classList.remove("hidden");
  createPostPlusIcon.classList.add("hidden");
  createPostMinusIcon.classList.remove("hidden");
}

editProfile();
getAllPosts();
createNewPost();
displayAllUserPosts();

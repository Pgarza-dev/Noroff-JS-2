console.log("createPosts.js");
import { API_BASE_URL } from "../constants.js";
import { getSingleProfile } from "../services/profiles.js";
import { getAllPosts } from "../services/posts.js";
import { editProfile } from "../utils/editProfile.js";
import { createNewPost } from "../utils/profilePageUtils.js";
import { displayAllUserPosts } from "../utils/profilePageUtils.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";

const myPostUrl = `${API_BASE_URL}/social/posts?_author=true&_comments=true&_reactions=true`;
const createPostButton = document.getElementById("create-post-button");
const newPostForm = document.getElementById("new-post-form");
const createPostPlusIcon = document.getElementById("create-post-plus-icon");
const createPostMinusIcon = document.getElementById("create-post-minus-icon");
const cancelPostButton = document.getElementById("cancel-post-button");

const avatar = document.getElementById("avatar");
const username = document.getElementById("profile-username");
const banner = document.getElementById("banner");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const followUnfollowButton = document.getElementById("follow-btn");

newPostForm.addEventListener("submit", createNewPost);
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
displayAllUserPosts();

async function settingUpTheProfile() {
  const username = getUsernameQueryParam();
  const singleProfileData = await getSingleProfile(username);

  console.log(singleProfileData);
}
settingUpTheProfile();

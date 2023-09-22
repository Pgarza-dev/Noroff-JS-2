console.log("createPosts.js");
import { API_BASE_URL } from "../constants.js";
import { createPost } from "../services/posts.js";
import { getAllPosts } from "../services/posts.js";
import { createFormDataObject } from "@lib/forms/utils";
import { getProfilePosts } from "../services/posts.js";
import { Post } from "../../components/post/post.js";

const myPostUrl = `${API_BASE_URL}/social/posts?_author=true&_comments=true&_reactions=true`;
const createPostButton = document.getElementById("create-post-button");
const newPostForm = document.getElementById("new-post-form");
const newPostDiv = document.getElementById("new-post");
const createPostPlusIcon = document.getElementById("create-post-plus-icon");
const createPostMinusIcon = document.getElementById("create-post-minus-icon");

createPostButton.addEventListener("click", displayInput);
newPostForm.addEventListener("submit", createNewPost);

async function createNewPost(event) {
  event.preventDefault();
  const form = createFormDataObject(newPostForm);
  try {
    const response = await createPost(form);
    console.log("Post created:", response);

    console.log(response);
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `<p>${response.title}</p><p>${response.body}</p>`;
    newPostDiv.appendChild(postDiv);
  } catch (error) {
    console.error(error);
  }
}

async function displayAllPosts() {
  const profilePostsSection = document.getElementById("profile-posts");
  console.log(posts);
}

function displayInput() {
  newPostForm.classList.remove("hidden");
  createPostPlusIcon.classList.add("hidden");
  createPostMinusIcon.classList.remove("hidden");
}

const profilePostsSection = document.getElementById("profile-posts");
async function main() {
  const posts = await getProfilePosts("dfd");

  console.log(posts);

  posts.forEach((post) => {
    profilePostsSection.appendChild(new Post(post));
  });
}

main();

// add event listener to input post form
//add event listener to new post button.
//after button click, display input fields for new post
//after input fields are filled out, add event listener to submit button
//after submit button is clicked, send post request to api
//after post request is sent, display new post on page
//{{baseUrl}}/social/posts?_author=true&_comments=true&_reactions=true

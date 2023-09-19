console.log("createPosts.js");
import { API_BASE_URL } from "../constants.js";
import { createPost } from "../services/posts.js";
import { createFormDataObject } from "@lib/forms/utils";

const createPostUrl = `${API_BASE_URL}/social/posts`;
const createPostForm = document.querySelector(".create-post-form");
const createPostButton = document.getElementById("create-post-button");
const postContainer = document.getElementById("post-container");
const newPostDiv = document.getElementById("new-post");

function createNewPost() {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");
  const textarea = document.createElement("textarea");
  textarea.classList.add("post-content");
  const submitPost = document.createElement("button");
  submitPost.classList.add("post-button");
  submitPost.style.backgroundColor = "white";
  submitPost.textContent = "Post";

  submitPost.addEventListener("click", function () {
    const postContent = textarea.value;
    newPostDiv.textContent = postContent;
    textarea.value = "";
    newPostDiv.style.display = "block";
    postDiv.style.display = "none";

    // const postFormData = {
    //   title: "Post Title",
    //   content: postContent,
    // };
    // const response = createPost(postFormData);
    // console.log(response);
    // if (response) {
    //   window.location.href = "";
    // }
  });
  postContainer.appendChild(postDiv);
  postDiv.appendChild(textarea);
  postDiv.appendChild(submitPost);
}

createPostButton.addEventListener("click", createNewPost);

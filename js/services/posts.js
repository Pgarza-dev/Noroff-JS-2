import { API_BASE_URL } from "../consts.js";
const allPostsUrl = `${API_BASE_URL}/social/posts`;
const singlePostUrl = `${API_BASE_URL}/social/posts/820`;
const allFollowersPosts = `${API_BASE_URL}/social/posts/following`;
const createPostUrl = `${API_BASE_URL}/social/posts`;
const updateSinglePost = `${API_BASE_URL}/social/posts/820`;

const urlParams = new URLSearchParams(window.location.search);
const singlePostId = urlParams.get("id");

async function getAllPosts(userData) {
  try {
    console.log(userData);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(userData, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getAllPosts(allPostsUrl);

async function getSinglePost(userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(userData, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getSinglePost(singlePostUrl);

async function getFollowersPosts(userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(userData, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getFollowersPosts(allFollowersPosts);

async function createPost(userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "string",
        body: "string",
        tags: ["string"],
      }),
    };
    const response = await fetch(userData, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
createPost(createPostUrl);

async function updatePost(userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "string",
        body: "string",
        tags: ["string"],
        media: "",
      }),
    };
    const response = await fetch(updateSinglePost + singlePostId, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
updatePost(updateSinglePost);

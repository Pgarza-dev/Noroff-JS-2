import { API_BASE_URL } from "../constants.js";

// Define API URLs
const allPostsUrl = `${API_BASE_URL}/social/posts?_comments=true&_reactions=true&_author=true`;
const singlePostUrl = `${API_BASE_URL}/social/posts/820`;
const followersPostsUrl = `${API_BASE_URL}/social/posts/following`;
const createPostUrl = `${API_BASE_URL}/social/posts`;
const profileUrl = `${API_BASE_URL}/social/profiles/`;
const urlParams = new URLSearchParams(window.location.search);
const singlePostId = urlParams.get("id");
const updateSinglePostUrl = `${API_BASE_URL}/social/posts/${singlePostId}`;
const deleteSinglePostUrl = `${API_BASE_URL}/social/posts/${singlePostId}`;
const reactSinglePostUrl = `${API_BASE_URL}/social/posts/${singlePostId}/react`;

export async function getProfilePosts(profileName) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      profileUrl + profileName + "/posts",
      fetchOptions,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPosts() {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(allPostsUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getSinglePost() {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(singlePostUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getFollowersPosts() {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(followersPostsUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(newPostData) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPostData),
    };
    const response = await fetch(createPostUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(updatedPostData) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPostData),
    };
    const response = await fetch(updateSinglePostUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost() {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteSinglePostUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function reactPost() {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(reactSinglePostUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

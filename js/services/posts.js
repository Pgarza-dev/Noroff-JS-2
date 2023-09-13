import { API_BASE_URL } from "../consts.js";

// Define API URLs
const allPostsUrl = `${API_BASE_URL}/social/posts`;
const singlePostUrl = `${API_BASE_URL}/social/posts/820`;
const followersPostsUrl = `${API_BASE_URL}/social/posts/following`;
const createPostUrl = `${API_BASE_URL}/social/posts`;

const urlParams = new URLSearchParams(window.location.search);
const singlePostId = urlParams.get("id");
const updateSinglePostUrl = `${API_BASE_URL}/social/posts/${singlePostId}`;
const deleteSinglePostUrl = `${API_BASE_URL}/social/posts/${singlePostId}`;
const reactSinglePostUrl = `${API_BASE_URL}/social/posts/${singlePostId}/react`;

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

const newPostData = {
  title: "New Title",
  body: "New Body Text",
  tags: ["tag1", "tag2"],
  media: "",
};

export async function createPost() {
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

const updatedPostData = {
  title: "Updated Title",
  body: "Updated Body Text",
  tags: ["tag3", "tag4"],
  media: "",
};

export async function updatePost() {
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

import { API_BASE_URL } from "../consts.js";
const allPostsUrl = `${API_BASE_URL}/social/posts`;
const singlePostUrl = `${API_BASE_URL}/social/posts/820`;
const allFollowersPosts = `${API_BASE_URL}/social/posts/following`;
const createPostUrl = `${API_BASE_URL}/social/posts`;

const urlParams = new URLSearchParams(window.location.search);
const singlePostId = urlParams.get("id");
const updateSinglePost = `${API_BASE_URL}/social/posts/${singlePostId}`;
const deleteSinglePost = `${API_BASE_URL}/social/posts/${singlePostId}`;
const reactSinglePost = `${API_BASE_URL}/social/posts/${singlePostId}/react`;

async function getAllPosts(allPostsUrl) {
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

async function getSinglePost(getSinglePostUrl) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(getSinglePostUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function getFollowersPosts(allFollowersPosts) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(allFollowersPosts, fetchOptions);
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

async function createPost(createPostUrl, newPostData) {
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

async function updatePost(updateSinglePost, updatedPostData) {
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
    const response = await fetch(updateSinglePost, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function deletePost(deleteSinglePost) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteSinglePost, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function reactPost(reactSinglePost) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(reactSinglePost, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

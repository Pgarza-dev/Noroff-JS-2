import { API_BASE_URL } from "../constants";
import { fetcher } from "./fetcher";

const allPostsUrl = `${API_BASE_URL}/social/posts`;
const singlePostUrl = `${API_BASE_URL}/social/posts/`;
const followedPostsUrl = `${API_BASE_URL}/social/posts/following`;
const profileUrl = `${API_BASE_URL}/social/profiles/`;

const fullQuery = {
  _comments: true,
  _reactions: true,
  _author: true,
};

/**
 * Fetches all posts for a given profile.
 * @param {string} profileName - The name of the profile.
 * @return {Promise<PostDataComplete>} - A promise that resolves to the posts data.
 */
export async function getProfilePosts(profileName) {
  return fetcher({
    url: `${profileUrl}${profileName}/posts`,
    query: {
      ...fullQuery,
    },
  });
}

/**
 * Fetches all posts.
 * @return {Promise<Array<PostDataComplete>>} - A promise that resolves to an array of posts.
 */
export async function getAllPosts() {
  return await fetcher({
    url: allPostsUrl,
    query: {
      ...fullQuery,
    },
  });
}

/**
 * Fetches a single post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @return {Promise<PostDataComplete>} - A promise that resolves to the post data.
 */
export async function getSinglePost(postId) {
  return await fetcher({
    url: singlePostUrl + postId,
    query: {
      ...fullQuery,
    },
  });
}

/**
 * Fetches all posts from followed profiles.
 * @return {Promise<Array<PostDataComplete>>} - A promise that resolves to an array of posts.
 */
export async function getFollowersPosts() {
  return await fetcher({
    url: followedPostsUrl,
    query: {
      ...fullQuery,
    },
  });
}

/**
 * Creates a new post.
 * @param {Object} newPostData - Data for the new post.
 * @param {string} newPostData.title - The title of the post.
 * @param {string} [newPostData.body] - The body of the post.
 * @param {Array<string>} [newPostData.tags] - Tags for the post.
 * @param {string} [newPostData.media] - Media URL for the post.
 * @return {Promise<PostDataBasic>} - A promise that resolves to the created post data.
 */
export async function createPost(newPostData) {
  return await fetcher({
    url: allPostsUrl,
    method: "POST",
    body: newPostData,
  });
}

/**
 * Updates a post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @param {Object} updatedPostData - Updated data for the post.
 * @param {string} updatedPostData.title - The title of the post.
 * @param {string} updatedPostData.body - The body of the post.
 * @param {Array<string>} updatedPostData.tags - Tags for the post.
 * @param {string} updatedPostData.media - Media URL for the post.
 * @return {Promise<PostDataBasic>} - A promise that resolves to the updated post data.
 */
export async function updatePost(postId, updatedPostData) {
  return await fetcher({
    url: singlePostUrl + postId,
    method: "PUT",
    body: updatedPostData,
  });
}

/**
 * Deletes a post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @return {Promise<void>} - A promise that resolves when the post is deleted.
 */
export async function deletePost(postId) {
  return await fetcher({
    url: singlePostUrl + postId,
    method: "DELETE",
  });
}

/**
 * Reacts to a post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @param {string} reactionType - The type of reaction (emoji).
 * @return {Promise<Object>} - A promise that resolves to the reaction data.
 */
export async function reactPost(postId, reactionType) {
  return await fetcher({
    url: `${singlePostUrl}${postId}/react/${reactionType}`,
    method: "PUT",
    body: {},
  });
}

/**
 * Adds a comment to a post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @param {Object} commentData - The comment data.
 * @param {string} commentData.body - The comment body.
 * @param {string | number} commentData.replyToId - Optional - Only required if replying to another comment
 * @return {Promise<Object>} - A promise that resolves to the comment data.
 */

export async function commentPost(postId, commentData) {
  return await fetcher({
    url: `${singlePostUrl}${postId}/comment`,
    method: "POST",
    body: commentData,
  });
}

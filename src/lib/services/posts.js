import {
  ALL_POSTS_ENDPOINT,
  FOLLOWED_POSTS_ENDPOINT,
  PROFILES_ENDPOINT,
  SINGLE_POST_ENDPOINT,
} from "@/lib/constants";
import { makeApiCall } from "@/lib/services/makeApiCall";

export const fullQuery = {
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
  return makeApiCall({
    endpoint: `${PROFILES_ENDPOINT}/${profileName}/posts`,
    query: {
      ...fullQuery,
    },
    errorMessage: "Could not get this profile's posts! Please try again.",
  });
}

/**
 * Fetches all posts.
 * @return {Promise<Array<PostDataComplete | []>>} - A promise that resolves to an array of posts.
 */
export async function getAllPosts() {
  return makeApiCall({
    endpoint: ALL_POSTS_ENDPOINT,
    query: {
      ...fullQuery,
    },
    errorMessage: "Could not get posts! Please try again.",
  });
}

/**
 * Fetches a single post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @return {Promise<PostDataComplete>} - A promise that resolves to the post data.
 */
export async function getSinglePost(postId) {
  return makeApiCall({
    endpoint: SINGLE_POST_ENDPOINT + postId,
    query: {
      ...fullQuery,
    },
    errorMessage: "Could not get post! Please try again.",
  });
}

/**
 * Fetches all posts from followed profiles.
 * @return {Promise<Array<PostDataComplete>>} - A promise that resolves to an array of posts.
 */
export async function getFollowersPosts() {
  return makeApiCall({
    endpoint: FOLLOWED_POSTS_ENDPOINT,
    query: {
      ...fullQuery,
    },
    errorMessage: "Could not get posts from followers! Please try again.",
  });
}

/**
 * Creates a new post.
 * @param {Object} newPostData - Data for the new post.
 * @param {string} newPostData.title - The title of the post.
 * @param {string} [newPostData.body] - The body of the post.
 * @param {Array<string>} [newPostData.tags] - Tags for the post.
 * @param {string} [newPostData.media] - Media URL for the post.
 * @return {Promise<PostDataComplete>} - A promise that resolves to the created post data.
 */
export async function createPost(newPostData) {
  return makeApiCall({
    endpoint: ALL_POSTS_ENDPOINT,
    method: "POST",
    body: newPostData,
    query: {
      ...fullQuery,
    },
    successMessage: "New post created!",
    errorMessage: "Could not create post! Please try again.",
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
 * @return {Promise<PostDataComplete>} - A promise that resolves to the updated post data.
 */
export async function updatePost(postId, updatedPostData) {
  return makeApiCall({
    endpoint: SINGLE_POST_ENDPOINT + postId,
    method: "PUT",
    body: updatedPostData,
    query: {
      ...fullQuery,
    },
    successMessage: "Post updated!",
    errorMessage: "Could not update post! Please try again.",
  });
}

/**
 * Deletes a post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @return {Promise<void>} - A promise that resolves when the post is deleted.
 */
export async function deletePost(postId) {
  return makeApiCall({
    endpoint: SINGLE_POST_ENDPOINT + postId,
    method: "DELETE",
    successMessage: "Post deleted!",
    errorMessage: "Could not delete post! Please try again.",
  });
}

/**
 * Reacts to a post by its ID.
 * @param {number} postId - The unique identifier of the post.
 * @param {string} reactionType - The type of reaction (emoji).
 * @return {Promise<Object>} - A promise that resolves to the reaction data.
 */
export async function reactPost(postId, reactionType) {
  return makeApiCall({
    endpoint: `${SINGLE_POST_ENDPOINT}${postId}/react/${reactionType}`,
    method: "PUT",
    errorMessage: "Could not react to post! Please try again.",
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
  return makeApiCall({
    endpoint: `${SINGLE_POST_ENDPOINT}${postId}/comment`,
    method: "POST",
    body: commentData,
    successMessage: "Comment added!",
    errorMessage: "Could not comment on post! Please try again.",
  });
}

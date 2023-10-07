import { PROFILES_ENDPOINT } from "../constants.js";
import { makeApiCall } from "../services/makeApiCall.js";

export async function getAllProfiles() {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT,
    errorMessage: "Could not get all profiles! Please try again.",
  });
}

export async function getSingleProfile(username) {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT + "/" + username,
    query: {
      _following: true,
      _followers: true,
      _posts: true,
    },
    errorMessage: `Could not get profile for ${username}! Please try again.`,
  });
}

export async function getSingleProfilePosts(username) {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT + "/" + username + "/posts",
    errorMessage: `Could not get posts for ${username}! Please try again.`,
  });
}

export async function updateProfilePicture(username, avatarUrl) {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT + "/" + username + "/media",
    method: "PUT",
    body: {
      avatar: avatarUrl,
    },
    errorMessage: "Could not update profile picture! Please try again.",
  });
}

export async function updateProfileBanner(username, bannerUrl) {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT + "/" + username + "/media",
    method: "PUT",
    body: {
      banner: bannerUrl,
    },
    successMessage: "Profile banner updated!",
    errorMessage: "Could not update profile banner! Please try again.",
  });
}

export async function followProfile(username) {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT + "/" + username + "/follow",
    method: "PUT",
    successMessage: `You are now following ${username}!`,
    errorMessage: `Could not follow ${username}! Please try again.`,
  });
}

export async function unFollowProfile(username) {
  return makeApiCall({
    endpoint: PROFILES_ENDPOINT + "/" + username + "/unfollow",
    method: "PUT",
    successMessage: `You are no longer following ${username}.`,
    errorMessage: `Could not unfollow ${username}! Please try again.`,
  });
}

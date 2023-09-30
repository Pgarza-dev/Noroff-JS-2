import { fetcher } from "./fetcher";
import { API_BASE_URL } from "../constants.js";

export async function getAllProfiles() {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles`,
  });
}

export async function getSingleProfile(username) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}`,
  });
}

export async function getSingleProfilePosts(username) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}/posts`,
  });
}

export async function updateEntryMedia(username, avatarUrl, bannerUrl) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}/media`,
    method: "PUT",
    body: {
      avatar: avatarUrl,
      banner: bannerUrl,
    },
  });
}

export async function followProfile(username) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}/follow`,
    method: "PUT",
  });
}

export async function unFollowProfile(username) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}/unfollow`,
    method: "PUT",
  });
}

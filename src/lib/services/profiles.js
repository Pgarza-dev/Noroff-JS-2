import { fetcher } from "../services/fetcher.js";
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

export async function updateProfilePicture(username, avatarUrl) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}/media`,
    method: "PUT",
    body: {
      avatar: avatarUrl,
    },
  });
}
export async function updateProfileBanner(username, bannerUrl) {
  return await fetcher({
    url: `${API_BASE_URL}/social/profiles/${username}/media`,
    method: "PUT",
    body: {
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

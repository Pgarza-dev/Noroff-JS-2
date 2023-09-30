import { fetcher } from "./fetcher";
import { API_BASE_URL } from "../constants.js";
import {
  setAccessToken,
  setActiveUser,
  setActiveUserAvatar,
} from "@/lib/utils/handleLocalStorageUser";
const registerUrl = `${API_BASE_URL}/social/auth/register`;
const loginUrl = `${API_BASE_URL}/social/auth/login`;

/**
 * API call to register a user
 * @param {string} url
 * @param {register object} userData
 * @example
 * registerUser( registerUrl, userToRegister);
 */
export async function registerUser(userData) {
  return await fetcher({
    url: registerUrl,
    method: "POST",
    body: userData,
    needsAuth: false,
  });
}

export async function loginUser(userData) {
  const data = await fetcher({
    url: loginUrl,
    method: "POST",
    body: userData,
    needsAuth: false,
  });

  if (data) {
    if (data.accessToken) setAccessToken(data.accessToken);
    if (data.name) setActiveUser(data.name);
    if (data.avatar) setActiveUserAvatar(data.avatar);
  }
  return data;
}

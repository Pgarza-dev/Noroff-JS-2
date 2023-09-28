import { fetcher } from "./fetcher";
import { API_BASE_URL } from "../constants.js";
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
    if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
    if (data.name) localStorage.setItem("username", data.name);
    if (data.avatar) localStorage.setItem("avatar", data.avatar);
  }
  return data;
}

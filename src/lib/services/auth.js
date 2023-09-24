import { API_BASE_URL } from "../constants.js";
const registerUrl = `${API_BASE_URL}/social/auth/register`;

/**
 * API call to register a user
 * @param {string} url
 * @param {register object} userData
 * ```js
 * registerUser( registerUrl, userToRegister);
 */
export async function registerUser(userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(registerUrl, postData);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error + "Something went wrong");
  }
}

const loginUrl = `${API_BASE_URL}/social/auth/login`;

export async function loginUser(userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(loginUrl, postData);
    const json = await response.json();

    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", json.name);
    localStorage.setItem("avatar", json.avatar);
    return json;
  } catch (error) {
    console.error(error + "Something went wrong");
  }
}

import { API_BASE_URL } from "../consts.js";
const registerUrl = `${API_BASE_URL}/social/auth/register`;

// 1. Register User. Create a function that takes in a url and a user object

/**
 * API call to register a user
 * @param {string} url
 * @param {register object} userData
 * ```js
 * registerUser( registerUrl, userToRegister);
 */
async function registerUser(userData) {
  try {
    // Api call
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(registerUrl, postData);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error + "Something went wrong");
  }
}

const userToRegister = {
  name: "PabloGarza",
  email: "pabgar91211@stud.noroff.no",
  password: "thisismypassword",
};

registerUser(userToRegister);

// 2.Login the User. Call the function with the url and the user object

const loginUrl = `${API_BASE_URL}/social/auth/login`;

async function loginUser(userData) {
  try {
    // Api call
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(loginUrl, postData);
    const json = await response.json();
    console.log(json);
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.log(error + "Something went wrong");
  }
}

const userToLogin = {
  email: "pabgar91211@stud.noroff.no",
  password: "thisismypassword",
};

loginUser(userToLogin);

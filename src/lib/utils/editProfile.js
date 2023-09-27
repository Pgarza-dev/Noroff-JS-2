console.log("current_user_profile.js");

import { createFormDataObject } from "../forms/utils";
import { API_BASE_URL } from "../constants.js";
const profileUrl = `${API_BASE_URL}/social/profiles/`;
console.log(profileUrl);

const loggedInUserName = localStorage.getItem("username");
const currentUserProfileName = loggedInUserName;
const editProfileButton = document.getElementById("edit-profile-button");
const profileName = document.getElementById("profile-name");
const profileAvatar = document.getElementById("profile-avatar");
const editProfileForm = document.getElementById("edit-profile-form");
const closeModalButton = document.getElementById("close-modal-btn");
const profileUsername = document.getElementById("profile-username");
const changeUsernameInput = document.getElementById("change-username-input");
const applyUsernameChangeButton = document.getElementById(
  "apply-username-change-button",
);

function profileUrlWithUserName(username) {
  if (loggedInUserName === currentUserProfileName) {
  }
  return `${API_BASE_URL}/social/profiles/${username}`;
}
console.log(profileUrlWithUserName(currentUserProfileName));

editProfileButton.addEventListener("click", () => {
  editProfileForm.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  editProfileForm.classList.add("hidden");
});

/**
 * check if user logged in is the same as the profile being viewed
 * if so, display edit profile button
 * @param {string} editProfile
 */
export function editProfile() {
  if (loggedInUserName === currentUserProfileName) {
    editProfileButton.classList.remove("hidden");
  } else {
    editProfileButton.classList.add("hidden");
  }
}

/**
 * checks if user logged in is the same as the profile being viewed
 * if so, display profile name
 * @param {string} profileNameParam
 * @returns {object} profile data
 * @returns {string} profile name
 */
function usersNameDisplayed() {
  if (loggedInUserName === currentUserProfileName) {
    profileUsername.innerText = loggedInUserName;
  } else {
    profileUsername.innerText = currentUserProfileName;
  }
}
usersNameDisplayed();

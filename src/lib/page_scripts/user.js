import toastStore from "@lib/stores/toastStore";
import {
  followProfile,
  getSingleProfile,
  unFollowProfile,
} from "../services/profiles.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";
import { getActiveUser } from "../utils/handleLocalStorageUser.js";
import { createNewPost, initUserPage } from "../utils/profilePageUtils.js";

const createPostButton = document.getElementById("create-post-button");
const newPostForm = document.getElementById("new-post-form");
const createPostPlusIcon = document.getElementById("create-post-plus-icon");
const createPostMinusIcon = document.getElementById("create-post-minus-icon");

const avatar = document.getElementById("avatar");
const profileName = document.getElementById("profile-username");
const banner = document.getElementById("banner");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const followUnFollowButton = document.getElementById("follow-btn");

const addToastBtn = document.getElementById("add-toast");

newPostForm.addEventListener("submit", createNewPost);
createPostButton.addEventListener("click", displayInput);

addToastBtn.addEventListener("click", () => {
  toastStore.addToast("This is a new toast!", "error");
});

createPostButton.addEventListener("click", () => {
  createPostButton.classList.add("theCard");
  createPostButton.classList.add("flip");
});

function displayInput() {
  newPostForm.classList.remove("hidden");
  createPostPlusIcon.classList.add("hidden");
  createPostMinusIcon.classList.remove("hidden");
}

function setUpProfileAvatar(avatarUrl) {
  if (avatarUrl) {
    avatar.src = avatarUrl;
  }
}

function setUpProfileBanner(bannerUrl) {
  if (bannerUrl) {
    banner.src = bannerUrl;
  }
}

function setUpFollowButton(followers, activeUser) {
  const isFollowing = followers.some(
    (follower) => follower.name === activeUser,
  );
  if (isFollowing) {
    followUnFollowButton.textContent = "Unfollow";
  } else {
    followUnFollowButton.textContent = "Follow";
  }
}

async function settingUpTheProfile() {
  const username = getUsernameQueryParam();
  const singleProfileData = await getSingleProfile(username);
  const activeUser = getActiveUser();

  profileName.textContent = singleProfileData.name;
  setUpProfileAvatar(singleProfileData.avatar);
  setUpProfileBanner(singleProfileData.banner);
  setUpFollowButton(singleProfileData.followers, activeUser);

  followers.textContent = singleProfileData._count.followers;
  following.textContent = singleProfileData._count.following;

  followUnFollowButton.addEventListener("click", async () => {
    const followersAmount = parseInt(followers.textContent);
    if (followUnFollowButton.textContent === "Follow") {
      followers.textContent = followersAmount + 1;
      followUnFollowButton.textContent = "Unfollow";
      await followProfile(username);
    } else {
      followUnFollowButton.textContent = "Follow";
      followers.textContent = followersAmount - 1;
      await unFollowProfile(username);
    }
  });
}
initUserPage();
settingUpTheProfile();

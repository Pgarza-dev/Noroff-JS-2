import {
  followProfile,
  getSingleProfile,
  unFollowProfile,
} from "../services/profiles.js";
import { getUsernameQueryParam } from "../utils/getUsernameQueryParam.js";
import { getActiveUser } from "../utils/handleLocalStorageUser.js";
import { initUserPage } from "../utils/profilePageUtils.js";

const avatar = document.getElementById("avatar");
const profileName = document.getElementById("profile-username");
const banner = document.getElementById("banner");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const followUnFollowButton = document.getElementById("follow-btn");

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

function setUpFollowButton(followers, activeUser, username) {
  if (activeUser !== username) {
    followUnFollowButton.style.display = "block";
  }
  const isFollowing = followers.some(
    (follower) => follower.name === activeUser,
  );
  if (isFollowing) {
    followUnFollowButton.textContent = "Unfollow";
  } else {
    followUnFollowButton.textContent = "Follow";
  }
}

async function setUpUserProfile() {
  const username = getUsernameQueryParam();
  const singleProfileData = await getSingleProfile(username);
  const activeUser = getActiveUser();

  profileName.textContent = singleProfileData.name;
  setUpProfileAvatar(singleProfileData.avatar);
  setUpProfileBanner(singleProfileData.banner);
  setUpFollowButton(singleProfileData.followers, activeUser, username);

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
setUpUserProfile();

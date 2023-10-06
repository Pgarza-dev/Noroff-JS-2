import { createFormDataObject } from "@/lib/forms/utils";
import {
  getSingleProfile,
  updateProfileBanner,
  updateProfilePicture,
} from "@/lib/services/profiles";
import toastStore from "@/lib/stores/toastStore";
import { getActiveUser } from "@/lib/utils/handleLocalStorageUser";

const username = getActiveUser();
const avatar = document.querySelector("#avatar");
const avatarUrlInput = document.querySelector("#avatar-url");
const bannerImg = document.querySelector("#banner");
const bannerImgUrl = document.querySelector("#banner-url");
const avatarForm = document.querySelector("#avatar-form");
const bannerForm = document.querySelector("#banner-form");

function setCurrentAvatar(avatarUrl) {
  if (!avatarUrl) {
    avatarUrl = "/images/default_user.png";
  }

  avatar.src = avatarUrl;
  avatarUrlInput.value = avatarUrl || "";
}

async function setCurrentBanner(bannerUrl) {
  if (!bannerUrl) {
    bannerUrl = "/images/default_banner.jpg";
  }

  bannerImg.src = bannerUrl;
  bannerImgUrl.value = bannerUrl || "";
}

async function setCurrentInfo() {
  const { avatar, banner } = await getSingleProfile(username);

  setCurrentAvatar(avatar);
  setCurrentBanner(banner);
}

setCurrentInfo();

async function checkImgUrl(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob.type.startsWith("image");
  } catch (error) {
    return false;
  }
}

avatarUrlInput.addEventListener("input", async (e) => {
  const avatarUrl = e.target.value;
  const isValidImg = await checkImgUrl(avatarUrl);
  if (!isValidImg) {
    return;
  }
  setCurrentAvatar(avatarUrl);
});

bannerImgUrl.addEventListener("input", async (e) => {
  const bannerUrl = e.target.value;
  const isValidImg = await checkImgUrl(e.target.value);
  if (!isValidImg) {
    return;
  }
  setCurrentBanner(bannerUrl);
});

avatarForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { avatar } = createFormDataObject(e.target);
  const serverResponse = await updateProfilePicture(username, avatar);

  if (serverResponse) {
    toastStore.addToast("Avatar updated", "success");
  } else {
    toastStore.addToast("Avatar could not be updated!", "error");
  }
});

bannerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { banner } = createFormDataObject(e.target);
  const serverResponse = await updateProfileBanner(username, banner);

  if (serverResponse) {
    toastStore.addToast("Banner updated", "success");
  } else {
    toastStore.addToast("Banner could not be updated!", "error");
  }
});

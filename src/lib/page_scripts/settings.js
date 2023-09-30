import { getSingleProfile } from "@/lib/services/profiles";
import { getActiveUser } from "@/lib/utils/handleLocalStorageUser";

const username = getActiveUser();

function setCurrentAvatar(avatarUrl) {
  const profileImg = document.querySelector("#avatar");
  const profileImgUrl = document.querySelector("#avatar-url");

  profileImg.src = avatarUrl;
  profileImgUrl.value = avatarUrl;
}

async function setCurrentBanner(bannerUrl) {
  const bannerImg = document.querySelector("#banner");
  const bannerImgUrl = document.querySelector("#banner-url");

  bannerImg.src = bannerUrl;
  bannerImgUrl.value = bannerUrl;
}

async function setCurrentInfo() {
  const { avatar, banner } = await getSingleProfile(username);

  setCurrentAvatar(avatar);
  setCurrentBanner(banner);
}

setCurrentInfo();

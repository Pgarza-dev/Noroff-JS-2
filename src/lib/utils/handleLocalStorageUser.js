const LOCAL_STORAGE_KEY = "username";

export function getActiveUser() {
  const username = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!username) {
    console.warn("No username found in localStorage.");
    return null;
  }
  return username;
}

export function setActiveUser(username) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Invalid username.");
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, username);
}

export function clearActiveUser() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getActiveUserAvatar() {
  const avatar = localStorage.getItem("avatar");
  if (!avatar) {
    console.warn("No avatar found in localStorage.");
    return null;
  }
  return avatar;
}

export function setActiveUserAvatar(avatar) {
  if (typeof avatar !== "string") {
    throw new Error("Invalid avatar.");
  }
  localStorage.setItem("avatar", avatar);
}

export function clearActiveUserAvatar() {
  localStorage.removeItem("avatar");
}

export function getAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.warn("No access token found in localStorage.");
    return null;
  }
  return accessToken;
}

export function setAccessToken(accessToken) {
  if (typeof accessToken !== "string") {
    throw new Error("Invalid access token.");
  }
  localStorage.setItem("accessToken", accessToken);
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export function removeActiveUser() {
  clearActiveUser();
  clearActiveUserAvatar();
  clearAccessToken();
}

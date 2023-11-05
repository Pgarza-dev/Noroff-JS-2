import { AUTH_FREE_PATHS } from "@/lib/constants";
import {
  getAccessToken,
  getActiveUser,
} from "@/lib/utils/handleLocalStorageUser";

function checkIfAuthFreePath(path) {
  return AUTH_FREE_PATHS.includes(path);
}

function goToUnauthorized() {
  // document.body.innerHTML += unauthorizedHtml;
  window.location.href = "/unauthorized/";
}

export function handleAuth() {
  const authFreePath = checkIfAuthFreePath(window.location.pathname);

  if (authFreePath) {
    return;
  }

  const activeUser = getActiveUser();
  const accessToken = getAccessToken();

  if (!activeUser || !accessToken) {
    console.warn("No active user or access token found, redirecting.");
    goToUnauthorized();
  }
}

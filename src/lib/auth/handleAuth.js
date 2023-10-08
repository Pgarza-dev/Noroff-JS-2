import { AUTH_FREE_PATHS } from "@/lib/constants";
import {
  getAccessToken,
  getActiveUser,
} from "@/lib/utils/handleLocalStorageUser";

function checkIfAuthFreePath(path) {
  return AUTH_FREE_PATHS.includes(path);
}

function goToUnauthorized() {
  setTimeout(() => {
    window.location.href = "/unauthorized/";
  }, 500); // 500ms delay to solve unresponsive page error in deployment
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

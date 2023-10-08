import { getAllProfiles } from "./profiles";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  isCacheValid,
} from "../utils/localStorageCache";

export async function fetchAllProfiles() {
  const cacheTime = 3_600_000; // 1 hour
  if (isCacheValid("allProfiles", cacheTime)) {
    return getFromLocalStorage("allProfiles");
  }

  const limit = 100;
  let offset = 0;
  let allProfiles = [];
  let hasMore = true;

  while (hasMore) {
    const profiles = await getAllProfiles(limit, offset);
    if (profiles.length === 0) {
      hasMore = false;
    } else {
      allProfiles = [...allProfiles, ...profiles];
      offset += limit;
    }
  }

  saveToLocalStorage("allProfiles", allProfiles);
  localStorage.setItem("allProfiles.cacheTime", Date.now());

  return allProfiles;
}

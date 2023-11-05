import { getAllProfiles } from "./profiles";
import { getAllPosts } from "./posts";
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

/* 
Get's the last 100 posts instead of all posts in order not to overload the API.
*/
export async function fetchAllPosts() {
  const cacheTime = 3_600_000; // 1 hour
  if (isCacheValid("allPosts", cacheTime)) {
    return getFromLocalStorage("allPosts");
  }

  const limit = 100;
  const offset = 0;

  const allPosts = await getAllPosts(limit, offset);

  saveToLocalStorage("allPosts", allPosts);
  localStorage.setItem("allPosts.cacheTime", Date.now());

  return allPosts;
}

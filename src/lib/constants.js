export const API_BASE_URL = "https://api.noroff.dev/api/v1";

export const USERNAME_MIN_LENGTH = 1;
export const PASSWORD_MIN_LENGTH = 8;
export const EMAIL_DOMAIN_WHITELIST = ["@noroff.no", "@stud.noroff.no"];
export const AUTH_FREE_PATHS = ["/login/", "/signup/", "/unauthorized/"];

export const ALL_POSTS_ENDPOINT = "/social/posts";
export const SINGLE_POST_ENDPOINT = "/social/posts/";
export const FOLLOWED_POSTS_ENDPOINT = "/social/posts/following";
export const PROFILES_ENDPOINT = "/social/profiles";

export const REGISTER_ENDPOINT = "/social/auth/register";
export const LOGIN_ENDPOINT = "/social/auth/login";

export const FULL_QUERY = {
  _comments: true,
  _reactions: true,
  _author: true,
};

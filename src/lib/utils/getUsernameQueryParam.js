export function getUsernameQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  return username;
}

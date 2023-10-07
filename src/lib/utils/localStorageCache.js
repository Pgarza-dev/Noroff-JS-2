export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function isCacheValid(key, duration) {
  const cacheTime = localStorage.getItem(`${key}.cacheTime`);
  return Date.now() - cacheTime < duration;
}

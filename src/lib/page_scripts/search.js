import { Post } from "@/components/post/post";
import { UserCard } from "@/components/search/userCard";
import { fetchAllProfiles, fetchAllPosts } from "@/lib/services/search";

const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const searchResultsNumber = document.querySelector("#search-results-number");
const searchBySelector = document.querySelector("#search-by");

function searchByUser(value, allProfiles) {
  if (value.length >= 2) {
    const filteredProfiles = allProfiles.filter((profile) => {
      const name = profile.name.toLowerCase();
      const email = profile.email.toLowerCase();

      return name.includes(value) || email.includes(value);
    });

    searchResults.innerHTML = "";
    searchResultsNumber.innerText = `${filteredProfiles.length} results.`;

    filteredProfiles.forEach((profile) => {
      const userCard = new UserCard(profile);
      searchResults.appendChild(userCard);
    });
  } else {
    searchResults.innerHTML = "";
    searchResultsNumber.innerText = "";
  }
}

function searchByPost(value, allPosts) {
  if (value.length >= 2) {
    const filteredPosts = allPosts.filter((post) => {
      let title = "";
      let body = "";

      if (post.title) {
        title = post.title.toLowerCase();
      }
      if (post.body) {
        body = post.body.toLowerCase();
      }

      return title.includes(value) || body.includes(value);
    });

    searchResults.innerHTML = "";
    searchResultsNumber.innerText = `${filteredPosts.length} results.`;

    filteredPosts.forEach((post) => {
      const postComponent = new Post(post);
      searchResults.appendChild(postComponent);
    });
  } else {
    searchResults.innerHTML = "";
    searchResultsNumber.innerText = "";
  }
}

function handleSearchInput(event, allProfiles, allPosts) {
  const value = event.target.value.toLowerCase().trim();
  const searchBy = searchBySelector.value;
  if (searchBy === "user") {
    searchByUser(value, allProfiles);
  } else if (searchBy === "post") {
    searchByPost(value, allPosts);
  }
}

async function initPage() {
  const allProfiles = await fetchAllProfiles();
  const allPosts = await fetchAllPosts();

  searchInput.focus();

  searchInput.addEventListener("keyup", async (event) =>
    handleSearchInput(event, allProfiles, allPosts),
  );

  searchBySelector.addEventListener("change", async (event) =>
    handleSearchInput(event, allProfiles, allPosts),
  );
}

initPage();

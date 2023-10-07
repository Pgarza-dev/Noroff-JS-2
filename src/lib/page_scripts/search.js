import { UserCard } from "@/components/search/userCard";
import { fetchAllProfiles } from "@/lib/services/search";

const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const searchResultsNumber = document.querySelector("#search-results-number");

function handleSearchInput(event, allProfiles) {
  const value = event.target.value.toLowerCase().trim();

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

async function initPage() {
  const allProfiles = await fetchAllProfiles();

  searchInput.focus();

  searchInput.addEventListener("keyup", async (event) =>
    handleSearchInput(event, allProfiles),
  );
}

initPage();

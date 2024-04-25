import { displayMediaList, displayPersonList } from "./modules/displayResult.js";
import { fetchData } from "./modules/fetchData.js";
import { noResult } from "./modules/errorHandling.js";
import { displayWatchList } from "./modules/watchList.js";

const searchFormEl = document.getElementById("searchForm");
const topMoviesBtn = document.getElementById("topMovies");
const popularMoviesBtn = document.getElementById("popularMovies");
const resultContainerEl = document.getElementById("resultContainer");
const showWatchListBtn = document.getElementById("showWatchList")

searchFormEl.addEventListener("submit", handleSearchBtn);
topMoviesBtn.addEventListener("click", handleTopMoviesBtn);
popularMoviesBtn.addEventListener("click", handlePopularMoviesBtn);
showWatchListBtn.addEventListener("click", handleWatchListBtn);

function handleWatchListBtn(event) {
  event.preventDefault();
  displayWatchList();
}

function handlePopularMoviesBtn(event) {
  event.preventDefault();
  fetchData("movie/popular?", showMovies);
}

function handleTopMoviesBtn(event) {
  event.preventDefault();
  fetchData("movie/top_rated?", showMovies);
}

async function handleSearchBtn(event) {
  event.preventDefault();
  const searchData = searchFormEl.querySelector("input").value;
  const searchType = searchFormEl.querySelector("select").value;
  await fetchData(`search/${searchType}?query=${searchData}&include_adult=false`, data => {
    if (data.total_results === 0) resultContainerEl.append(noResult());
    else {
      if (searchType === "movie") {
        displayMediaList(data, ["release_date", "title", "poster_path", "overview"], true);
      } else {
        displayPersonList(data, ["name", "known_for_department", "profile_path", "known_for"]);
      }
    }
  });
  searchFormEl.reset();
}

//Need this to handle the callback of "data" from fetchData()
function showMovies(data) {
  displayMediaList(data, ["release_date", "original_title", "title", "poster_path", "overview"]);
}
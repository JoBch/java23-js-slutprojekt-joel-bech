import { displayMediaList, displayPersonList } from "./displayResult.js";
import { fetchData } from "./fetchData.js";
import { noResult } from "./errorHandling.js";

/** 
 * TODO
 * Need to make it async - dont know how, might have to start from the beginning?
 * Move the logic of handleSearch somewhere else
 * Make something with the errorhandling ----> something is done with errorHandling
 * Looked over the variables and functions names but it needs more looking into 
 * -------------------------
 * Maybe CSS isnt only for the non creative people?
 * Add the functionality of a watchlist using LocalStorage
 **/

const searchForm = document.getElementById("searchForm");
const topMoviesBtn = document.getElementById("topMovies");
const popularMoviesBtn = document.getElementById("popularMovies");
const resultContainer = document.getElementById("resultContainer");

searchForm.addEventListener("submit", handleSearch);
topMoviesBtn.addEventListener("click", handleTopMovies);
popularMoviesBtn.addEventListener("click", handlePopularMovies);

function handlePopularMovies(event) {
  event.preventDefault();
  fetchData("movie/popular?", showMovies);
}

function handleTopMovies(event) {
  event.preventDefault();
  fetchData("movie/top_rated?", showMovies);
}

async function handleSearch(event) {
  event.preventDefault();
  const searchData = searchForm.querySelector("input").value;
  const searchType = searchForm.querySelector("select").value;
  await fetchData(`search/${searchType}?query=${searchData}&include_adult=false`, data => {
    if (data.total_results === 0) resultContainer.append(noResult());
    else {
      if (searchType === "movie") {
        displayMediaList(data, ["release_date", "title", "poster_path", "overview"], true);
      } else {
        displayPersonList(data, ["name", "known_for_department", "profile_path", "known_for"]);
      }
    }
  });
  searchForm.reset();
}

function showMovies(data) {
  displayMediaList(data, ["release_date", "title", "poster_path", "overview"]);
}
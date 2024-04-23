import { displayMediaList, displayPersonList } from "./displayResult.js";
import { fetchData } from "./fetchData.js"; 

const searchForm = document.getElementById("searchForm");
const topMoviesBtn = document.getElementById("topMovies");
const popularMoviesBtn = document.getElementById("popularMovies");

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

function handleSearch(event) {
  event.preventDefault();
  const searchData = searchForm.querySelector("input").value;
  const searchType = searchForm.querySelector("select").value;
  fetchData(`search/${searchType}?query=${searchData}&include_adult=false`, data => {
    if (searchType === "movie") {
      displayMediaList(data, ["release_date", "title", "poster_path", "overview"], true);
    } else {
      displayPersonList(data, ["name", "known_for_department", "profile_path", "known_for"]);
    }
  });
  searchForm.reset();
}

function showMovies(data) {
  displayMediaList(data, ["release_date", "title", "poster_path", "overview"]);
}
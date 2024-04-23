export let watchList = JSON.parse(localStorage.getItem("watchListData"));
const basePosterURL = "https://image.tmdb.org/t/p/w154";

export function addToWatchList(title, posterPath) {
    //Check if the movie is already in the watchlist ---> might skip this?
    const isAlreadyAdded = watchList.some(item => item.title === title);

    if (!isAlreadyAdded) {
        watchList.push({ title: title, posterPath: posterPath });
        localStorage.setItem("watchListData", JSON.stringify(watchList));
        console.log("Added to watchlist:", title);
    } else {
        console.log("Already in watchlist:", title);
    }
}

export function displayWatchList() {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";
    console.log(watchList);
    const watchListUl = document.createElement("ul");
    const clearWatchListBtn = document.createElement("button");
    clearWatchListBtn.textContent = "Clear Watchlist";
    
    clearWatchListBtn.addEventListener("click", () => {
        watchList = []
        resultContainer.innerHTML = "";
    });
    watchListUl.appendChild(clearWatchListBtn);

    watchList.forEach(movie => {
        const innerListitem = document.createElement("li")
        const listItem = document.createElement("ul");
        const imgEl = document.createElement("img");
        imgEl.src = basePosterURL + movie.posterPath;
        listItem.textContent = movie.title;
        innerListitem.appendChild(imgEl);
        listItem.appendChild(innerListitem);
        watchListUl.appendChild(listItem);
    });

    resultContainer.appendChild(watchListUl);
}

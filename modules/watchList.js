//Handles all of the watchList functionality using localStorage 

export let watchList = JSON.parse(localStorage.getItem("watchListData"));

const basePosterURL = "https://image.tmdb.org/t/p/w154";

export function addToWatchList(title, posterPath) {
    const isAlreadyAdded = watchList.some(item => item.title === title);

    if (!isAlreadyAdded) {
        watchList.push({ title: title, posterPath: posterPath });
        localStorage.setItem("watchListData", JSON.stringify(watchList));
        aler("Added to watchlist : " + title);
    } else {
        alert("Already in watchlist : " + title);
    }
}

export function displayWatchList() {
    const resultContainerEl = document.getElementById("resultContainer");
    resultContainerEl.innerHTML = "";
    console.log(watchList);
    const watchListUl = document.createElement("ul");

    watchList.forEach((movie, index) => {
        const innerListitem = document.createElement("li")
        const listItem = document.createElement("ul");
        const imgEl = document.createElement("img");
        const clearWatchListBtn = document.createElement("button");

        clearWatchListBtn.textContent = "Watched it!";
        clearWatchListBtn.addEventListener("click", () => {
            deleteFromWatchList(index);
        });

        imgEl.src = basePosterURL + movie.posterPath;
        listItem.textContent = movie.title;
        innerListitem.appendChild(imgEl);
        listItem.appendChild(innerListitem);
        listItem.appendChild(clearWatchListBtn);
        watchListUl.appendChild(listItem);

    });
    resultContainerEl.appendChild(watchListUl);
}

function deleteFromWatchList(index) {
    watchList.splice(index, 1);
    localStorage.setItem("watchListData", JSON.stringify(watchList));
    displayWatchList();
}
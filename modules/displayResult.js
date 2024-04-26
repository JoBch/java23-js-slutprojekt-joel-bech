//Creates lists that is filled with the values specified when calling these functions in the eventlistener

//I've had a lot of trouble namning these variables as they represent every value that is displayed in my lists.
//I hope i made it readable enough.

import { addToWatchList } from "./watchList.js";

const posterBaseUrl = "https://image.tmdb.org/t/p/w185";
const thumbnailBaseUrl = "https://image.tmdb.org/t/p/w154";
const resultListContainer = document.getElementById("resultContainer");

export function displayMediaList(data, propertiesToDisplay, isFreeSearch) {
    console.log(data);
    const listType = isFreeSearch === true ? "ul" : "ol";
    const extractedData = data.results.slice(0, isFreeSearch ? undefined : 10).map(item => {
        const extractedItem = {};
        propertiesToDisplay.forEach(property => {
            extractedItem[property] = item[property];
        });
        return extractedItem;
    });
    resultListContainer.innerHTML = "";
    const outerListEl = document.createElement(listType);
    extractedData.forEach(extractedDataIndex => {

        const listItemEl = document.createElement("li");
        const innerSubListEl = document.createElement("ul");
        const thumbnailEl = document.createElement("img");
        thumbnailEl.src = thumbnailBaseUrl + extractedDataIndex.poster_path;
        thumbnailEl.alt = "Picture not found!";
        listItemEl.appendChild(thumbnailEl);

        const addToWatchlistBtn = document.createElement("button");
        addToWatchlistBtn.textContent = "Add to Watchlist";
        addToWatchlistBtn.addEventListener("click", () => {
            addToWatchList(extractedDataIndex.title, extractedDataIndex.poster_path);
        });
        innerSubListEl.appendChild(addToWatchlistBtn);

        Object.keys(extractedDataIndex).forEach(apiKeyValue => {
            if (apiKeyValue !== "poster_path") {
                const subListItem = document.createElement("li");
                subListItem.textContent = `${apiKeyValue}: ${extractedDataIndex[apiKeyValue]}`;
                innerSubListEl.appendChild(subListItem);
            }
        });
        listItemEl.appendChild(innerSubListEl);
        outerListEl.appendChild(listItemEl);
    });
    resultListContainer.appendChild(outerListEl);
    console.log("displayMediaList");
}

export function displayPersonList(data, propertiesToDisplay) {
    console.log(data);
    const extractedData = data.results.map(item => {
        const extractedItem = {};
        propertiesToDisplay.forEach(property => {
            extractedItem[property] = item[property];
        });
        return extractedItem;
    });
    resultListContainer.innerHTML = "";
    const outerListEl = document.createElement("ul");

    extractedData.forEach(extractedDataIndex => {
        const listItemEl = document.createElement("li");
        const innerSubListEl = document.createElement("ul");
        const profileImgEl = document.createElement("img");
        profileImgEl.src = posterBaseUrl + extractedDataIndex.profile_path;
        profileImgEl.alt = "Picture not found!";
        listItemEl.appendChild(profileImgEl);

        Object.keys(extractedDataIndex).forEach(apiKeyValue => {
            if (apiKeyValue !== "profile_path") {
                const subListItem = document.createElement("li");
                subListItem.textContent = `${apiKeyValue}: ${extractedDataIndex[apiKeyValue]}`;
                if (apiKeyValue === "known_for") {
                    extractedDataIndex[apiKeyValue].forEach(known_forItem => {
                        const nestedSubListItem = document.createElement("li");
                        nestedSubListItem.textContent = `${known_forItem.media_type}: ${known_forItem.media_type === "movie" ? known_forItem.title : known_forItem.name}`;
                        innerSubListEl.appendChild(nestedSubListItem);
                    });
                } else {
                    innerSubListEl.appendChild(subListItem);
                }
            }
        });
        listItemEl.appendChild(innerSubListEl);
        outerListEl.appendChild(listItemEl);
    });
    resultListContainer.appendChild(outerListEl);
    console.log("displayPersonList");
}

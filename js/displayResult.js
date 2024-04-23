const baseProfileURL ="https://image.tmdb.org/t/p/w185";
const basePosterURL = "https://image.tmdb.org/t/p/w154";
const resultContainer = document.getElementById("resultContainer");

export function displayMediaList(data, apiProperties, isFreeSearch) {
    console.log(data);
    const listType = isFreeSearch === true ? "ul" : "ol";
    const extractedData = data.results.slice(0, isFreeSearch ? undefined : 10).map(item => {
        const extractedItem = {};
        apiProperties.forEach(property => {
            extractedItem[property] = item[property];
        });
        return extractedItem;
    });
    resultContainer.innerHTML = "";
    const outerListEl = document.createElement(listType);
    extractedData.forEach(dataIndex => {
        const innerListEl = document.createElement("li");
        const innerSubListEl = document.createElement("ul");
        const imgEl = document.createElement("img");
        imgEl.src = basePosterURL + dataIndex.poster_path;
        imgEl.alt = "Picture not found!";
        innerListEl.appendChild(imgEl);
        Object.keys(dataIndex).forEach(keyValue => {
            if(keyValue !== "poster_path") {
                const subListItem = document.createElement("li");
                subListItem.textContent = `${keyValue}: ${dataIndex[keyValue]}`;
                innerSubListEl.appendChild(subListItem);
            }
        });
        innerListEl.appendChild(innerSubListEl);
        outerListEl.appendChild(innerListEl);
    });
    resultContainer.appendChild(outerListEl);
}

export function displayPersonList(data, apiProperties) {
    console.log(data);
    const extractedData = data.results.map(item => {
        const extractedItem = {};
        apiProperties.forEach(property => {
            extractedItem[property] = item[property];
        });
        return extractedItem;
    });
    resultContainer.innerHTML = "";
    const outerListEl = document.createElement("ul");
    extractedData.forEach(dataIndex => {
        const innerListEl = document.createElement("li");
        const subListEl = document.createElement("ul");
        const imgEl = document.createElement("img");
        imgEl.src = baseProfileURL + (dataIndex.profile_path);
        imgEl.alt = "Picture not found!";
        innerListEl.appendChild(imgEl);
        Object.keys(dataIndex).forEach(keyValue => {
            if (keyValue !== "profile_path") {
                const subListItem = document.createElement("li");
                subListItem.textContent = `${keyValue}: ${dataIndex[keyValue]}`;
                if (keyValue === "known_for") {
                    dataIndex[keyValue].forEach(data => {
                        const nestedSubListItem = document.createElement("li");
                        nestedSubListItem.textContent = `${data.media_type}: ${data.media_type === "movie" ? data.title : data.name}`;
                        subListEl.appendChild(nestedSubListItem);
                    });
                } else {
                    subListEl.appendChild(subListItem);
                }
            }
        });
        innerListEl.appendChild(subListEl);
        outerListEl.appendChild(innerListEl);
    });
    resultContainer.appendChild(outerListEl);
}

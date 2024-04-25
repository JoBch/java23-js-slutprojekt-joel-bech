//Functions that's imported into catch and if-statements that check if there is data returned from api 
//or if the response from api is not ok

export function noResult() {
    document.getElementById("resultContainer").innerText = "";
    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = "No results found, try again!";
    console.log("noResult")
    return errorMessage;
}

export function noResponse() {
    document.getElementById("resultContainer").innerText = "";
    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = "Something went wrong, please try again!";
    console.log("No response")
    return errorMessage;
}
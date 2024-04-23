export function noResult(){
    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = "No results found, try again!";
    return errorMessage;
}
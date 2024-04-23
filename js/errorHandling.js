//This should be called when total_results==0 but i cant make it stop here it only moves on to displayResults
export function noResult(){
    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = "No results found, try again!";
    return errorMessage;
}
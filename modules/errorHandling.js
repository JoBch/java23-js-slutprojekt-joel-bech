export function noResult(){
    document.getElementById("resultContainer").innerText="";
    const errorMessage = document.createElement("h1");
    errorMessage.innerHTML = "No results found, try again!";
    console.log("noResult")
    return errorMessage;
}
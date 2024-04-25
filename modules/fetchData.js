//Fetches data from the api and puts it in a variable that can be used when later calling a function in displayResults

import { noResponse } from "./errorHandling.js";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzI2OGM3YzhhOTZjNzFiZjBmMjljZjJhNTNkOWM5YyIsInN1YiI6IjY2MWY5MzAyN2FlY2M2MDE3YzZjZTJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rvCXw8vsB1n7yPseYaE-_A5IEjDN61EV6_WhAhWSdDw"; // Put your TMDb API key here
const API_URL = "https://api.themoviedb.org/3/";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const resultContainer = document.getElementById("resultContainer");

export async function fetchData(endpoint, callback) {
    try {
        const response = await fetch(`${API_URL}${endpoint}&language=en-US&page=1`, options)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            callback(data);
        } else if (!response.ok) {
            resultContainer.append(noResponse());
        }
    } catch (error) {
        resultContainer.append(noResponse());
    }
    console.log("fetchData")
}

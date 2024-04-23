const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzI2OGM3YzhhOTZjNzFiZjBmMjljZjJhNTNkOWM5YyIsInN1YiI6IjY2MWY5MzAyN2FlY2M2MDE3YzZjZTJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rvCXw8vsB1n7yPseYaE-_A5IEjDN61EV6_WhAhWSdDw"; // Put your TMDb API key here
const API_URL = "https://api.themoviedb.org/3/";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

//Trying to make the project async but im stuck, so this is a start or something
export async function fetchData(endpoint, callback) {
    try {
        fetch(`${API_URL}${endpoint}&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => callback(data))
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
    console.log("fetchData")
}

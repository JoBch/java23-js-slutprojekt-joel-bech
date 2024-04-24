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
        const response = await fetch(`${API_URL}${endpoint}&language=en-US&page=1`, options)

        if(response.ok){
            const data = await response.json();
            console.log(data);
            callback(data);
        } else if(response.status == 404){
            throw new Error('Movie not found');
        }
/*          .then(response => response.json()) //Maybe check the response here and add some error handling incase it comes back 404 or something (maybe use response.ok) 
            .then(data => callback(data)) */
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
    console.log("fetchData")
}

import { useState } from "react"; // Importing React's useState hook to manage component state.
import Search from "./search/Search"; // Importing Search component for location search functionality.
import CurrentWeather from "./current-weather/CurrentWeather"; // Importing CurrentWeather component to display current weather details.
import Forecast from "./forecast/Forecast"; // Importing Forecast component to display weather forecast.
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api"; // Importing constants for the API base URL and API key.
import './Weather.css' // Importing CSS file for styling the Weather component.

export const Weather = () => {
    // State to store current weather data, initially set to null.
    const [currentWeather, setCurrentWeather] = useState(null);

    // State to store weather forecast data, initially set to null.
    const [forecast, setForecast] = useState(null);

    // Function that handles changes when a user selects a location from the search bar.
    const handleOnSearchChange = (searchData) => {
        // Extracting latitude and longitude from the selected search data.
        const [lat, lon] = searchData.value.split(" ");

        // Fetch current weather data for the selected location using latitude and longitude.
        const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // Fetch weather forecast data for the selected location.
        const forecastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // Use Promise.all to handle both API requests simultaneously.
        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                // Parsing the response data from the current weather API.
                const weatherResponse = await response[0].json();
                // Parsing the response data from the forecast API.
                const forcastResponse = await response[1].json();

                // Updating the current weather state with the fetched data.
                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                // Updating the forecast state with the fetched data.
                setForecast({ city: searchData.label, ...forcastResponse });

                // Logging the current weather data to the console (for debugging purposes).
                console.log(currentWeather);
            })
            // Handle any errors that occur during the fetch process.
            .catch(console.log);
    };

    return (
        <div className="weather">
            {/* Search component to allow users to search for a city/location.
                Passing handleOnSearchChange as a prop to handle location changes. */}
            <Search onSearchChange={handleOnSearchChange} />

            {/* If currentWeather state has data, display the CurrentWeather component. */}
            {currentWeather && <CurrentWeather data={currentWeather} />}

            {/* If forecast state has data, display the Forecast component. */}
            {forecast && <Forecast data={forecast} />}
        </div>
    );
}

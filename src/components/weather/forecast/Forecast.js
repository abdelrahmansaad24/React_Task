import React from "react"; // Importing React to use JSX and component functionality.
import {
    Accordion, // Main container for the collapsible sections (daily weather forecasts).
    AccordionItem, // Individual collapsible section.
    AccordionItemHeading, // Heading of each collapsible item.
    AccordionItemButton, // Button for expanding/collapsing the section.
    AccordionItemPanel, // Content panel inside the collapsible section.
} from "react-accessible-accordion"; // Importing components from 'react-accessible-accordion' for accordion functionality.
import "./Forecast.css"; // Importing the CSS file for styling the Forecast component.

// Array for the names of the days of the week.
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    // Get the current day of the week (0 for Sunday, 1 for Monday, etc.).
    const dayInAWeek = new Date().getDay();

    // Reorder the WEEK_DAYS array so that it starts with the current day and loops through the week.
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <forecast>
            {/* Title for the forecast section */}
            <label className="title">Daily</label>

            {/* Accordion that allows expanding/collapsing multiple days */}
            <Accordion allowZeroExpanded>
                {/* Mapping through the weather data for the next 7 days */}
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}> {/* Unique key for each forecast item */}
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {/* Display basic weather information for each day */}
                                <div className="daily-item">
                                    {/* Weather icon */}
                                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                                    {/* Day of the week (e.g., Monday, Tuesday) */}
                                    <label className="day">{forecastDays[idx]}</label>
                                    {/* Short weather description (e.g., cloudy, sunny) */}
                                    <label className="description">{item.weather[0].description}</label>
                                    {/* Min and max temperatures for the day */}
                                    <label className="min-max">
                                        {Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>

                        {/* Panel that expands to show additional weather details */}
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                {/* Display weather details in a grid layout */}
                                <div className="daily-details-grid-item">
                                    <label>Pressure:</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds:</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea level:</label>
                                    <label>{item.main.sea_level} m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like:</label>
                                    <label>{item.main.feels_like}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </forecast>
    );
};

export default Forecast;

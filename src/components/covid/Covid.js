// Filename - CovidData.js

import React, { useEffect, useState } from "react"; // Importing React and hooks for state and lifecycle management
import { CountryDropdown } from 'react-country-region-selector'; // Importing a dropdown component for country selection
import "./Covid.css"; // Importing CSS styles for this component
import { CovidStatsChart } from "./graph/CovidStatsChart"; // Importing the chart component to display COVID-19 statistics

// Main component function for displaying COVID-19 data
export const Covid = () => {
    // State variables to hold country and COVID-19 statistics
    const [country, setCountry] = useState("Egypt");
    const [cases, setCases] = useState("");
    const [recovered, setRecovered] = useState("");
    const [deaths, setDeaths] = useState("");
    const [todayCases, setTodayCases] = useState("");
    const [deathCases, setDeathCases] = useState("");
    const [recoveredCases, setRecoveredCases] = useState("");

    // useEffect hook to fetch data on component mount
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries") // Fetching list of countries and their COVID-19 data
            .then((res) => res.json()) // Parsing the response to JSON
            .then((data) => {
                setData(data); // Setting the fetched data to state
            });
    }, []); // Empty dependency array means this effect runs only once

    // Function to set data from fetched response
    const setData = ({
                         country,
                         cases,
                         deaths,
                         recovered,
                         todayCases,
                         todayDeaths,
                         todayRecovered,
                     }) => {
        setCountry(country); // Updating the selected country
        setCases(cases); // Updating total cases
        setRecovered(recovered); // Updating total recovered
        setDeaths(deaths); // Updating total deaths
        setTodayCases(todayCases); // Updating cases reported today
        setDeathCases(todayDeaths); // Updating deaths reported today
        setRecoveredCases(todayRecovered); // Updating recoveries reported today
    };

    // Function to fetch data for a specific country
    function getData(val) {
        fetch(`https://disease.sh/v3/covid-19/countries/${val}`) // Fetching data for the selected country
            .then((res) => res.json()) // Parsing the response to JSON
            .then((data) => {
                setData(data); // Updating state with the country-specific data
            });
    }

    // Fetch data for the selected country if it is defined
    if (country !== undefined)
        getData(country);

    // Rendering the component
    return (
        <div className={"covidData"}>
            <h1 className={"title"}>COVID-19 CASES COUNTRY WISE</h1>
            <div className="covidData__input">
                <form>
                    {/* Dropdown for selecting a country */}
                    <CountryDropdown
                        className="dropDown"
                        value={country} // Current selected country
                        onChange={(val) => {
                            setCountry(val); // Update country state on selection
                            getData(val); // Fetch data for the newly selected country
                        }}
                    />
                </form>
            </div>

            {/* Displaying the details of the selected country */}
            <div className="covidData__country__info">
                <p>Country Name: {country}</p>
                <p>Cases: {cases}</p>
                <p>Deaths: {deaths}</p>
                <p>Recovered: {recovered}</p>
                <p>Cases Today: {todayCases}</p>
                <p>Deaths Today: {deathCases}</p>
                <p>Recovered Today: {recoveredCases}</p>
            </div>

            {/* Rendering the CovidStatsChart if country data is available */}
            {(country !== undefined) && <CovidStatsChart data={{
                cases: cases,
                deaths: deaths,
                recovered: recovered,
                todayCases: todayCases,
                todayDeaths: deathCases,
                todayRecovered: recoveredCases
            }} />}
        </div>
    );
};

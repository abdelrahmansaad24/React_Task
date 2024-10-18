import React, { useState } from "react"; // Importing React and useState hook for managing component state.
import { AsyncPaginate } from "react-select-async-paginate"; // Importing AsyncPaginate component for async dropdown with pagination.
import { geoApiOptions, GEO_API_URL } from "../Api"; // Importing API options and URL constants for the geo-location API.

const Search = ({ onSearchChange }) => {
  // State to store the selected search value (city).
  const [search, setSearch] = useState(null);

  // Function to load options dynamically based on the user's input.
  const loadOptions = (inputValue) => {
    return fetch(
        // Fetches city data from the geo-location API based on the user input (inputValue).
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
    )
        .then((response) => response.json()) // Converts the response to JSON.
        .then((response) => {
          // Mapping over the response data to format it for the dropdown options.
          return {
            options: response.data.map((city) => {
              return {
                // The value contains the latitude and longitude of the city.
                value: `${city.latitude} ${city.longitude}`,
                // The label displays the city name and country code.
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
        });
  };

  // Function to handle changes when a city is selected from the dropdown.
  const handleOnChange = (searchData) => {
    setSearch(searchData); // Update the search state with the selected city data.
    onSearchChange(searchData); // Call the parent component's function to handle the selected city.
  };

  // Custom styles for the AsyncPaginate dropdown to enhance the UI.
  const customStyles = {
    option: (provided, state) => ({
      // Styles for the individual options in the dropdown.
      ...provided,
      backgroundColor: state.isSelected ? 'blue' : state.isFocused ? '#d3d3d3' : null, // Blue background when selected, light gray when focused.
      color: state.isSelected ? 'white' : 'black', // White text if selected, black otherwise.
    }),
    control: (provided) => ({
      // Styles for the control (input box) of the dropdown.
      ...provided,
      borderColor: '#ccc', // Light gray border for the control box.
    }),
  };

  return (
      <AsyncPaginate
          placeholder="Search for city" // Placeholder text for the dropdown.
          debounceTimeout={600} // Debounces the user input to avoid sending requests too frequently (600 ms delay).
          value={search} // The selected value in the dropdown.
          onChange={handleOnChange} // Event handler to update state and pass the selection to the parent component.
          loadOptions={loadOptions} // Function to load options asynchronously based on user input.
          styles={customStyles} // Applying the custom styles for better UI.
      />
  );
};

export default Search;

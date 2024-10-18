import './App.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { NavBar } from "./components/NavBar"; // Import the NavBar component
import { Footer } from "./components/Footer"; // Import the Footer component
import { Route, Routes, useLocation } from 'react-router-dom'; // Import routing and location utilities from React Router
import { useEffect, useState } from "react"; // Import hooks: useEffect and useState
import { Weather } from "./components/weather/Weather"; // Import Weather component
import { Covid } from "./components/covid/Covid"; // Import Covid component
import { Crypto } from "./components/crypto/Crypto"; // Import Crypto component

function App() {
    const location = useLocation(); // Get the current route location
    const [loc, setLoc] = useState('Weather'); // Initialize a state variable to track the current section (default is 'Weather')

    useEffect(() => {
        // Update `loc` based on the current route path
        switch (location.pathname) {
            case '/weather':
                setLoc("Weather"); // If the path is '/weather', set `loc` to 'Weather'
                break;
            case '/crypto':
                setLoc("Crypto"); // If the path is '/crypto', set `loc` to 'Crypto'
                break;
            case '/covid':
                setLoc("Covid"); // If the path is '/covid', set `loc` to 'Covid'
                break;
            default:
                setLoc("Weather"); // For any other route (including '/'), set `loc` to 'Weather'
                break;
        }
    }, [location.pathname]); // Trigger this effect whenever the path changes

    return (
        <div className="App">
            {/* Pass `loc` (current section) as a prop to the NavBar component */}
            <NavBar loc={loc} />

            {/* Define routes for different pages */}
            <Routes>
                <Route path="/" element={<Weather />} /> {/* Default route (root) shows Weather */}
                <Route path="/weather" element={<Weather />} /> {/* Weather route */}
                <Route path="/covid" element={<Covid />} /> {/* Covid route */}
                <Route path="/crypto" element={<Crypto />} /> {/* Crypto route */}
            </Routes>

            {/* Render Footer at the bottom */}
            <Footer />
        </div>
    );
}

export default App;

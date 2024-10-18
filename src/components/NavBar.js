import { useState, useEffect } from "react"; // Importing React hooks for state and side effects
import { Navbar, Container, Nav } from "react-bootstrap"; // Importing components from Bootstrap for the Navbar
import navIcon1 from '../assets/img/nav-icon1.svg'; // Importing social media icon images
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/Github (2).png';
import { HashLink } from 'react-router-hash-link'; // Importing HashLink for smooth scrolling to specific sections
import { Link } from 'react-router-dom'; // Importing Link for routing between pages

import {
    BrowserRouter as Router, Routes, Route, useNavigate // Importing router components and navigation hook from React Router
} from "react-router-dom";

export const NavBar = (loc) => {
    // State to track whether the page is scrolled
    const [scrolled, setScrolled] = useState(false);

    // Functions to handle social media link redirects in new tabs
    const handleL = (event) => {
        event.preventDefault();
        window.open("https://www.linkedin.com/in/abdelrhman-saad-93b6451bb/", "_blank"); // Open LinkedIn profile in a new tab
    };

    const handleW = (event) => {
        event.preventDefault();
        window.open("https://wa.me/+201154154046", "_blank"); // Open WhatsApp in a new tab
    };

    const handleF = (event) => {
        event.preventDefault();
        window.open("https://facebook.com/abdosaad24", "_blank"); // Open Facebook profile in a new tab
    };

    const handleG = (event) => {
        event.preventDefault();
        window.open("https://github.com/abdelrahmansaad24", "_blank"); // Open GitHub profile in a new tab
    };

    // Effect to track the scroll position and update the state
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true); // If scrolled down more than 50px, mark it as scrolled
            } else {
                setScrolled(false); // Reset if scrolled back to the top
            }
        }

        window.addEventListener("scroll", onScroll); // Attach scroll event listener

        return () => window.removeEventListener("scroll", onScroll); // Clean up event listener on component unmount
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="/">
                    {/* Displaying the name or logo */}
                    <h5 className="name">Abdelrahman Saad</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span> {/* Toggle button for smaller screens */}
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className={"ms-auto"}>
                        {/* Navigation links for different sections */}
                        <Nav className="ms-auto">
                            {/* Link to Weather page, highlighted if currently selected */}
                            <Nav.Link as={Link} to="/weather" className={loc.loc === 'Weather' ? 'active navbar-link' : 'navbar-link'}>
                                Weather
                            </Nav.Link>
                            {/* Link to Crypto page */}
                            <Nav.Link as={Link} to="/crypto" className={loc.loc === 'Crypto' ? 'active navbar-link' : 'navbar-link'}>
                                Crypto
                            </Nav.Link>
                            {/* Link to Covid page */}
                            <Nav.Link as={Link} to="/covid" className={loc.loc === 'Covid' ? 'active navbar-link' : 'navbar-link'}>
                                Covid
                            </Nav.Link>
                        </Nav>
                    </div>
                    <span className="navbar-text">
                        {/* Social media icons */}
                        <div className="social-icon">
                            {/* LinkedIn icon */}
                            <a onClick={handleL}><img src={navIcon1} alt="LinkedIn" /></a>
                            {/* Facebook icon */}
                            <a onClick={handleF}><img src={navIcon2} alt="Facebook" /></a>
                            {/* GitHub icon */}
                            <a onClick={handleG}><img src={navIcon3} alt="GitHub" /></a>
                        </div>
                        {/* WhatsApp button linking to the 'connect' section */}
                        <HashLink to='#connect' onClick={handleW}>
                            <button className="vvd"><span>Let’s Connect</span></button>
                        </HashLink>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

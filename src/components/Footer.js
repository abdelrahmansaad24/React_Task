import { Container, Row, Col } from "react-bootstrap"; // Importing Bootstrap components
import logo from "../assets/img/logo.png"; // Logo for the footer
import navIcon1 from "../assets/img/nav-icon1.svg"; // Social media icons
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/Github (2).png";

export const Footer = () => {
  // Handlers for opening social media links in a new tab
  const handleL = (event) => {
    event.preventDefault();
    window.open("https://www.linkedin.com/in/abdelrhman-saad-93b6451bb/", "_blank");
  };

  const handleF = (event) => {
    event.preventDefault();
    window.open("https://facebook.com/abdosaad24", "_blank");
  };

  const handleG = (event) => {
    event.preventDefault();
    window.open("https://github.com/abdelrahmansaad24", "_blank");
  };

  return (
      <footer className="footer">
        <Container>
          <Row className="align-items-center">
            {/* Optional Mailchimp form placeholder for future use */}
            {/*<MailchimpForm />*/}
            <Col size={12} sm={6}>
              {/* Displaying footer logo */}
              <img src={logo} alt="Logo" />
            </Col>
            <Col size={12} sm={6} className="text-center text-sm-end">
              {/* Social media icons with event handlers */}
              <div className="social-icon">
                <a onClick={handleL}><img src={navIcon1} alt="LinkedIn" /></a>
                <a onClick={handleF}><img src={navIcon2} alt="Facebook" /></a>
                <a onClick={handleG}><img src={navIcon3} alt="GitHub" /></a>
              </div>
              {/* Footer copyright notice */}
              <p>Copyright 2024. All Rights Reserved</p>
            </Col>
          </Row>
        </Container>
      </footer>
  );
};

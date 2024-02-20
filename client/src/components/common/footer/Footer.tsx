import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import useThemeStore from "../../../stores/themeStore";

export default function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <Navbar
        bg={`${isDarkMode ? "dark" : "light"}`}
        variant="light"
        expand="lg"
        className="fixed-bottom bg-light"
      >
        <Container className=" py-1">
          <Row className="w-100">
            <Col className="text-center mb-lg-0" md={6} sm={12}>
              Selmen Rayen &copy; 2024. All rights reserved.
            </Col>
            <Col className="text-center text-lg-end" md={6} sm={12}>
              <Link
                to="https://github.com/SRayen"
                target="_blank"
                className="me-3"
              >
                <FaGithub size={24} style={{ color: "#2be135" }} />
              </Link>
              <Link
                to="https://www.linkedin.com/in/rayen-selmen/"
                target="_blank"
                className="me-3"
              >
                <FaLinkedin size={24} style={{ color: "#2be135" }} />
              </Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}

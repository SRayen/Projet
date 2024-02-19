import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import { FaSquareFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import useThemeStore from "../../../stores/themeStore";

export default function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <Navbar
        bg={`${isDarkMode ? "dark" : "light"}`}
        variant={"light"}
        expand="lg"
      >
        <Container className="d-flex align-items-center justify-content-between">
          <Row>
            <Col
              className="d-flex flex-column align-items-center justify-content-center ft-1 m-4"
              xs={12}
              md={4}
            >
              <h3>
                <span className="title-span">round</span>desk
              </h3>
              <div className=" px-3">
                <span>
                  Roundesk Technologies is a new start-up that targets SMEs,
                  ETIs and Large Enterprises through an omnichannel and
                  cross-channel Customer Relationship Management tool.
                </span>
              </div>
            </Col>
            <Col
              className="d-flex flex-column align-items-center justify-content-center ft-1 m-4"
              xs={12}
              md={3}
            >
              <div className="footer-icons">
                <Link to="/about">
                  <FaSquareFacebook className="react-icon-class" />
                </Link>
                <Link to="/about">
                  <FaGithub className="react-icon-class" />
                </Link>
                <Link to="/about">
                  <FaLinkedin className="react-icon-class" />
                </Link>
              </div>
            </Col>

            <Col
              className="d-flex align-items-center justify-content-center  m-4"
              xs={12}
              md={3}
            >
              <div className="d-flex flex-column align-items-center justify-content-center ft-1">
                <h5>Contact</h5>
                <ul>
                  <li className="nav-item">
                    <i className="fa-solid fa-phone-volume"></i> +216 95730757
                  </li>
                  <li className="nav-item">
                    <i className="fa-solid fa-envelope"></i>
                    selmen.rayen.92@gmail.com
                  </li>
                  <li className="nav-item">
                    <p>
                      <i className="fa-solid fa-paper-plane"></i> Selmen rayen,
                      Tunisia.
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}

import { Navbar, Container, Nav, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";
import DarkMode from "../../DarkMode/DarkMode";
import { useThemeStore } from "../../../stores/themeStore";

export default function Header() {
  const { isDarkMode } = useThemeStore();
  return (
    <Navbar
      expand="lg"
      className="justify-content-between"
      bg={`${isDarkMode ? "dark" : "light"}`}
      variant={"light"}
    >
      <Container fluid>
        <Nav.Link as={Link} to={"/"}>
          <Image src="./roundesk-logo.png" className="logo-img" />
        </Nav.Link>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: "var(--toggle-color)" }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          <Form className="d-flex">
            <Nav
              style={{
                maxHeight: "100px",
                display: "flex",
                alignItems: "center",
              }}
              className="me-auto my-2 my-lg-0"
              navbarScroll
            >
              <Nav.Link
                as={Link}
                to={"/login"}
                className="navLink"
                style={{
                  color: isDarkMode
                    ? "var(--primary-color-dark)"
                    : "var(--primary-color-light)",
                }}
              >
                Se connecter
              </Nav.Link>

              <Nav.Link
                as={Link}
                to={"/register"}
                className="navLink"
                style={{
                  color: isDarkMode
                    ? "var(--primary-color-dark)"
                    : "var(--primary-color-light)",
                }}
              >
                S'inscrire
              </Nav.Link>
              <DarkMode />
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

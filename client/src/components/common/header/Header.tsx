import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";
import DarkMode from "../../DarkMode/DarkMode";
import { useThemeStore } from "../../../stores/themeStore";
import Button from "../../Button";

export default function Header() {
  const { isDarkMode } = useThemeStore();
  return (
    <Navbar
      bg={`${isDarkMode ? "dark" : "light"}`}
      variant={"light"}
      expand="lg"
      className="justify-content-between"
    >
      <Container className="justify-content-between">
        <div>
          <Link to="/">
            <img src="./roundesk-logo.png" className="logo-img" />
          </Link>
        </div>
        <div className="d-flex">
          <DarkMode />
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Button
            label="hello"
            onClick={() => {
              console.log("test");
            }}
          />

          <Button
            label="hello"
            outline={true}
            onClick={() => {
              console.log("test");
            }}
          />
        </div>
      </Container>
    </Navbar>
  );
}

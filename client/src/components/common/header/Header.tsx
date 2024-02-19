import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <nav className="header">
      <img src="./roundesk-logo.png" alt="logo" className="img" />
      <ul className="list">
        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <div className="logo-box">
            <FaLeaf />
          </div>

          <div className="logo-text">
            <h2>NeighbourFood</h2>
            <span>Connecting Surplus to Smiles</span>
          </div>
        </Link>

        <nav>
          <a href="#about">About</a>
          <a href="#how">How it Works</a>
          <a href="#impact">Impact</a>
        </nav>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Register
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
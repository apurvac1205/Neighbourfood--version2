import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2>NeighbourFood</h2>

        <p>
          Reducing food waste by connecting food vendors with NGOs.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="#how">How it Works</a>
          <a href="#about">About</a>
        </div>

        <span>© 2026 NeighbourFood. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
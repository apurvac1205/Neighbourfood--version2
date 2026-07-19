import "./Landing.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import heroImage from "../../assets/images/hero.svg";

import {
FaStore,
FaHandsHelping,
FaClipboardCheck,
FaLeaf,
FaUsers,
FaRecycle
} from "react-icons/fa";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Navbar />

      <section className="hero container">
        <div className="hero-left">
          <span className="hero-tag">
           <FaLeaf />
           Sustainable Food Sharing
          </span>

          <h1>
            Share Surplus Food,
            <br />
            Support Local Communities.
          </h1>

          <p>
            NeighbourFood connects restaurants, cafés and grocery stores with NGOs
            to redistribute surplus food instead of letting it go to waste.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                document.getElementById("how")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={heroImage}
            alt="NeighbourFood Hero"
          />
        </div>
      </section>

      <section id="how" className="how-section container">
        <div className="section-heading">
          <h2>How NeighbourFood Works</h2>

          <p>
            Three simple steps to reduce food waste.
          </p>
        </div>

        <div className="steps">

<div className="step-card">

<div className="step-icon">

<FaStore/>

</div>

<h3>

Food Vendors

</h3>

<p>

Restaurants and grocery stores publish surplus food that would otherwise go to waste.

</p>

</div>

<div className="step-card">

<div className="step-icon">

<FaHandsHelping/>

</div>

<h3>

NGOs Discover

</h3>

<p>

Nearby NGOs browse available food listings and claim items instantly.

</p>

</div>

<div className="step-card">

<div className="step-icon">

<FaClipboardCheck/>

</div>

<h3>

Verified Pickup

</h3>

<p>

A secure verification code confirms every successful pickup.

</p>

</div>

</div>
      </section>

      <section id="about" className="features-section container">
        <div className="section-heading">
          <h2>Why NeighbourFood?</h2>

          <p>
            Designed to make surplus food distribution simple and transparent.
          </p>
        </div>

        <div className="features-grid">

<div className="feature-card">

<div className="feature-icon">

<FaRecycle/>

</div>

<h3>

Reduce Waste

</h3>

<p>

Redirect surplus food instead of sending it to landfills.

</p>

</div>

<div className="feature-card">

<div className="feature-icon">

<FaUsers/>

</div>

<h3>

Support Communities

</h3>

<p>

Connect businesses with NGOs and community shelters.

</p>

</div>

<div className="feature-card">

<div className="feature-icon">

<FaLeaf/>

</div>

<h3>

Sustainable Impact

</h3>

<p>

Contribute towards the United Nations Sustainable Development Goal 2.

</p>

</div>

</div>
      </section>

      <section id="impact" className="impact-section">
        <div className="container">
          <div className="impact-card">
            <div>
              <h2>150+</h2>
              <p>Meals Shared</p>
            </div>

            <div>
              <h2>35+</h2>
              <p>Food Vendors</p>
            </div>

            <div>
              <h2>20+</h2>
              <p>Partner NGOs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section container">
        <div className="cta-card">
          <h2>Ready to Make an Impact?</h2>

          <p>
            Join NeighbourFood and help reduce food waste in your community.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <h3>NeighbourFood</h3>

          <p>
            Reducing food waste by connecting food vendors with NGOs.
          </p>

          <span>© 2026 NeighbourFood</span>
        </div>
      </footer>
    </div>
  );
}
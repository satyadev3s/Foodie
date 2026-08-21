import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>🍴 Foodie</h2>
        <p>
          Fresh meals, simple ordering, and fast doorstep delivery for every
          craving.
        </p>
      </div>

      <div className="footer-column">
        <h3>Explore</h3>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-column">
        <h3>Support</h3>
        <p>Help Center</p>
        <p>Delivery: 30-45 mins</p>
        <p>Open daily: 9 AM - 11 PM</p>
      </div>

      <div className="footer-column">
        <h3>Contact</h3>
        <p>Email: hello@foodie.test</p>
        <p>Phone: +91 6301202481</p>
        <p>© 2026 Foodie</p>
      </div>
    </footer>
  );
}

export default Footer;

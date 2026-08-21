import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">Fast, fresh, and flavorful</span>
        <h1>Order Your Favorite Food</h1>
        <p>
          Discover hot meals, sweet desserts, and refreshing drinks delivered
          with the comfort and speed your cravings deserve.
        </p>
        <Link to="/menu" className="btn btn-primary">
          Order Now
        </Link>
      </div>

      <div className="hero-image-wrap" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
          alt=""
          className="hero-image"
        />
      </div>
    </section>
  );
}

export default Hero;

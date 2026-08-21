import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import FoodCard from "../components/FoodCard.jsx";
import Hero from "../components/Hero.jsx";
import { categories, foods } from "../data/foods.js";

const categoryImages = {
  Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
  Burger: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=500&q=80",
  Biryani: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=500&q=80",
  Chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
  Desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=80",
  Drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80"
};

function Home() {
  const navigate = useNavigate();
  const popularDishes = foods.filter((food) => food.rating >= 4.7).slice(0, 6);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Choose your mood</span>
          <h2>Popular Categories</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              image={categoryImages[category]}
              onClick={() => navigate(`/menu?category=${category}`)}
            />
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="section-heading row-heading">
          <div>
            <span className="eyebrow">Chef favorites</span>
            <h2>Popular Dishes</h2>
          </div>
          <Link to="/menu" className="text-link">
            View full menu
          </Link>
        </div>
        <div className="food-grid">
          {popularDishes.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

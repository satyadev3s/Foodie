import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard.jsx";
import { categories, foods } from "../data/foods.js";

function Menu() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="page-section">
      <div className="page-title">
        <span className="eyebrow">Explore fresh picks</span>
        <h1>Menu</h1>
        <p>Search by name, filter by category, and build your perfect order.</p>
      </div>

      <div className="menu-controls">
        <input
          type="search"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="filter-buttons" aria-label="Food categories">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="food-grid">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No dishes found</h2>
          <p>Try another search term or category.</p>
        </div>
      )}
    </section>
  );
}

export default Menu;

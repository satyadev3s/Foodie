import { useNavigate } from "react-router-dom";
import { useCart } from "../App.jsx";

const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23fff0e9'/%3E%3Ccircle cx='450' cy='300' r='170' fill='%23f04f32' opacity='0.18'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='54' font-weight='700' fill='%23cf3c22'%3EFoodie%3C/text%3E%3C/svg%3E";

function FoodCard({ food }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === food.id);

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  return (
    <article className="food-card">
      <img
        src={food.image}
        alt={food.name}
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="food-card-body">
        <div className="food-card-top">
          <h3>{food.name}</h3>
          <span className="rating">★ {food.rating}</span>
        </div>
        <p>{food.description}</p>
        <div className="food-card-bottom">
          <strong>₹{food.price}</strong>
          {cartItem ? (
            <div className="card-cart-actions">
              <div className="quantity-controls compact-quantity">
                <button onClick={() => decreaseQuantity(food.id)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => increaseQuantity(food.id)}>+</button>
              </div>
              <button className="btn btn-small" onClick={() => navigate("/cart")}>
                Go to Cart
              </button>
            </div>
          ) : (
            <button className="btn btn-small" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default FoodCard;

import { useCart } from "../App.jsx";

const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23fff0e9'/%3E%3Ccircle cx='450' cy='300' r='170' fill='%23f04f32' opacity='0.18'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='54' font-weight='700' fill='%23cf3c22'%3EFoodie%3C/text%3E%3C/svg%3E";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>₹{item.price} each</p>
        <strong>₹{item.price * item.quantity}</strong>
      </div>

      <div className="quantity-controls" aria-label={`${item.name} quantity`}>
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
      </div>

      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </article>
  );
}

export default CartItem;

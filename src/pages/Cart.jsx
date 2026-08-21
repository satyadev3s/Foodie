import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import { useCart } from "../App.jsx";

function Cart() {
  const { cartItems, subtotal, deliveryFee, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="page-section">
        <div className="empty-state empty-cart">
          <div className="empty-icon">🛒</div>
          <h1>Your cart is empty</h1>
          <p>Add something delicious from the menu to get started.</p>
          <Link to="/menu" className="btn btn-primary">
            Go to Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-title">
        <span className="eyebrow">Almost there</span>
        <h1>Your Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="summary-panel">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>₹{deliveryFee}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary full-width">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Cart;

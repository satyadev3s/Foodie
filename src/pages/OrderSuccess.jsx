import { Link } from "react-router-dom";
import { useCart } from "../App.jsx";

function OrderSuccess() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <section className="page-section success-section">
        <div className="success-card">
          <h1>No recent order</h1>
          <p>Place an order first to see its confirmation details here.</p>
          <Link to="/menu" className="btn btn-primary">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section success-section">
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for ordering with Foodie.</p>
        <div className="order-details">
          <span>Order ID: {lastOrder.id}</span>
          <strong>Total Amount: ₹{lastOrder.total}</strong>
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;

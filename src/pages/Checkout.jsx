import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../App.jsx";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, deliveryFee, total, clearCart, saveLastOrder } =
    useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    paymentMethod: "Cash on Delivery"
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const isComplete =
      formData.fullName.trim() &&
      formData.mobileNumber.trim() &&
      formData.address.trim();

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checkout.");
      return;
    }

    if (!isComplete) {
      setError("Please fill in your name, mobile number, and delivery address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const order = {
      id: `FD${Date.now()}`,
      total,
      items: cartItems,
      customer: formData
    };

    saveLastOrder(order);
    clearCart();
    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <h1>No items to checkout</h1>
          <p>Your cart is empty right now.</p>
          <Link to="/menu" className="btn btn-primary">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-title">
        <span className="eyebrow">Secure checkout</span>
        <h1>Checkout</h1>
      </div>

      <form className="checkout-layout" onSubmit={placeOrder}>
        <div className="checkout-form">
          <div className="form-block">
            <h2>Customer Information</h2>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </label>
            <label>
              Mobile Number
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </label>
            <label>
              Delivery Address
              <textarea
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number, street, city"
              />
            </label>
          </div>

          <div className="form-block">
            <h2>Payment Method</h2>
            {["Cash on Delivery", "UPI", "Card"].map((method) => (
              <label className="radio-row" key={method}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                />
                {method}
              </label>
            ))}
          </div>

          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary" type="submit">
            Place Order
          </button>
        </div>

        <aside className="summary-panel">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>
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
        </aside>
      </form>
    </section>
  );
}

export default Checkout;

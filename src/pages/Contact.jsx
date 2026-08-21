import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="page-section">
      <div className="page-title">
        <span className="eyebrow">Contact us</span>
        <h1>We would love to hear from you</h1>
        <p>
          Send feedback, ask a question, or tell us what dish Foodie should add
          next.
        </p>
      </div>

      <div className="contact-layout">
        <form className="checkout-form contact-form" onSubmit={handleSubmit}>
          <div className="form-block">
            <label>
              Your Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </label>
            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message"
              />
            </label>
          </div>

          {submitted && (
            <p className="success-message">
              Message submitted locally. Thanks for reaching out!
            </p>
          )}

          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </form>

        <aside className="contact-panel">
          <h2>Foodie Support</h2>
          <p>Email: hello@foodie.test</p>
          <p>Phone: +91 6301202481</p>
          <p>Address: 42 Flavor Street, Hyderabad, India</p>
          <p>Hours: 9 AM - 11 PM, every day</p>
        </aside>
      </div>
    </section>
  );
}

export default Contact;

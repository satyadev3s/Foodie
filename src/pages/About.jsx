function About() {
  return (
    <section className="page-section">
      <div className="page-title">
        <span className="eyebrow">About Foodie</span>
        <h1>Fresh food, simple ordering</h1>
        <p>
          Foodie is a clean front-end food ordering website where customers can
          sign in, explore dishes, manage their cart, and place a demo order.
        </p>
      </div>

      <div className="content-grid">
        <article className="info-card">
          <h2>Fresh Choices</h2>
          <p>
            Browse pizzas, burgers, biryanis, Chinese favorites, desserts, and
            drinks from a simple menu.
          </p>
        </article>
        <article className="info-card">
          <h2>Easy Ordering</h2>
          <p>
            After login, users can search dishes, add items to cart, update
            quantities, and review the full bill.
          </p>
        </article>
        <article className="info-card">
          <h2>Local Demo App</h2>
          <p>
            The project uses React, Context API, React Router, CSS, and
            localStorage only. No backend or payment gateway is used.
          </p>
        </article>
      </div>

      <div className="feature-band">
        <div>
          <span>18+</span>
          <p>Menu items</p>
        </div>
        <div>
          <span>6</span>
          <p>Food categories</p>
        </div>
        <div>
          <span>₹40</span>
          <p>Flat delivery fee</p>
        </div>
      </div>
    </section>
  );
}

export default About;

import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart, useUser } from "../App.jsx";

function Navbar() {
  const { cartCount } = useCart();
  const { user } = useUser();
  const { pathname } = useLocation();
  const isOrderingPage =
    pathname === "/menu" || pathname === "/cart" || pathname === "/logout";

  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="Foodie home">
        🍴 Foodie
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        {!isOrderingPage && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </>
        )}
        {user ? (
          <>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/cart">🛒 Cart ({cartCount})</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

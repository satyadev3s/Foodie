import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Logout from "./pages/Logout.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const CartContext = createContext();
const UserContext = createContext();

export const useCart = () => useContext(CartContext);
export const useUser = () => useContext(UserContext);

function getInitialCart() {
  try {
    return JSON.parse(localStorage.getItem("foodieCart")) || [];
  } catch {
    return [];
  }
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);
  const [lastOrder, setLastOrder] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("foodieLastOrder")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("foodieCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === food.id);
      if (existing) {
        return items.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { ...food, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const saveLastOrder = (order) => {
    setLastOrder(order);
    sessionStorage.setItem("foodieLastOrder", JSON.stringify(order));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      deliveryFee,
      total,
      cartCount,
      lastOrder,
      saveLastOrder
    }),
    [cartItems, subtotal, deliveryFee, total, cartCount, lastOrder]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function getInitialUser() {
  try {
    return JSON.parse(localStorage.getItem("foodieUser")) || null;
  } catch {
    return null;
  }
}

function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const registerUser = (userData) => {
    const newUser = {
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile
    };
    localStorage.setItem("foodieUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const loginUser = (userData) => {
    const loggedInUser = {
      name: userData.email.split("@")[0] || "Foodie Guest",
      email: userData.email
    };
    localStorage.setItem("foodieUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logoutUser = () => {
    localStorage.removeItem("foodieUser");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, registerUser, loginUser, logoutUser }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function ProtectedPage({ children }) {
  const { user } = useUser();

  if (!user) {
    return (
      <section className="page-section auth-required-section">
        <div className="auth-card">
          <span className="eyebrow">Login required</span>
          <h1>Please sign in first</h1>
          <p>
            Register or login to view the menu, add food to your cart, and place
            an order.
          </p>
          <div className="auth-actions">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return children;
}

function App() {
  const { pathname } = useLocation();

  return (
    <UserProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/menu"
                element={
                  <ProtectedPage>
                    <Menu />
                  </ProtectedPage>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedPage>
                    <Cart />
                  </ProtectedPage>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedPage>
                    <Checkout />
                  </ProtectedPage>
                }
              />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          {pathname !== "/menu" && <Footer />}
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

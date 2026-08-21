import { Link } from "react-router-dom";
import { useUser } from "../App.jsx";

function Logout() {
  const { user, logoutUser } = useUser();

  return (
    <section className="page-section success-section">
      <div className="success-card">
        <div className="success-icon">👋</div>
        <h1>{user ? "Ready to logout?" : "You are logged out"}</h1>
        <p>
          {user
            ? `You are currently signed in as ${user.name || user.email}.`
            : "You can login again anytime to continue your Foodie session."}
        </p>

        <div className="auth-actions">
          {user && (
            <button className="btn btn-primary" onClick={logoutUser}>
              Logout
            </button>
          )}
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Logout;

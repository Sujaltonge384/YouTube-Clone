import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Header({ onMenuClick }) {
  const navigate = useNavigate();

  // Get authentication information
  // from our AuthContext
  const { user, logout } = useAuth();


  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    logout();

    // Return the user to Home after logout
    navigate("/");
  };


  return (
    <header className="header">

      {/* ==================================================
          HAMBURGER MENU
          ================================================== */}

      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>


      {/* ==================================================
          LOGO
          ================================================== */}

      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        <span className="logo-icon">
          ▶
        </span>

        <span className="logo-text">
          YouTube
        </span>
      </div>


      {/* ==================================================
          SEARCH
          ================================================== */}

      <div className="header-search">

        <input
          type="text"
          placeholder="Search"
        />

        <button aria-label="Search">
          🔍
        </button>

      </div>


      {/* ==================================================
          HEADER ACTIONS
          ================================================== */}

      <div className="header-actions">

        {user ? (

          // =================================================
          // LOGGED-IN USER
          // =================================================

          <>
            <span className="header-username">
              {user.username}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        ) : (

          // =================================================
          // LOGGED-OUT USER
          // =================================================

          <button
            className="sign-in-button"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

        )}

      </div>

    </header>
  );
}

export default Header;
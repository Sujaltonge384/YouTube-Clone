import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Header({
  onMenuClick,
  searchTerm,
  setSearchTerm,
}) {

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <header className="header">


      {/* ==================================================
          MENU BUTTON
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
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
        />

        <button
          type="button"
          aria-label="Search"
        >
          🔍
        </button>

      </div>


      {/* ==================================================
          AUTH ACTIONS
          ================================================== */}

      <div className="header-actions">

        {user ? (

          <>
            {/* Logged-in username */}
            <span className="header-username">
              {user.username}
            </span>


            {/* Go to user's channel */}
            <button
              className="my-channel-button"
              onClick={() => navigate("/my-channel")}
            >
              My Channel
            </button>


            {/* Logout */}
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        ) : (

          // Logged-out user
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
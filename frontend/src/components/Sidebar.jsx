import { Link, NavLink } from "react-router-dom";

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          🏠 <span>Home</span>
        </NavLink>

        <Link to="/" className="sidebar-link">
          🔥 <span>Trending</span>
        </Link>

        <Link to="/" className="sidebar-link">
          📺 <span>Subscriptions</span>
        </Link>

        <hr />

        <Link to="/my-channel" className="sidebar-link">
          👤 <span>Your Channel</span>
        </Link>

        <Link to="/" className="sidebar-link">
          📚 <span>Library</span>
        </Link>

        <Link to="/" className="sidebar-link">
          🕘 <span>History</span>
        </Link>

        <Link to="/" className="sidebar-link">
          👍 <span>Liked videos</span>
        </Link>

        <hr />

        <Link to="/" className="sidebar-link">
          ⚙️ <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
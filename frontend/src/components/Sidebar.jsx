function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

      {/* Main navigation */}
      <nav>

        <a href="/">
          🏠
          <span>Home</span>
        </a>

        <a href="#">
          🔥
          <span>Trending</span>
        </a>

        <a href="#">
          📺
          <span>Subscriptions</span>
        </a>

        <hr />

        <a href="#">
          📚
          <span>Library</span>
        </a>

        <a href="#">
          🕘
          <span>History</span>
        </a>

        <a href="#">
          👍
          <span>Liked videos</span>
        </a>

        <hr />

        <a href="#">
          ⚙️
          <span>Settings</span>
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;
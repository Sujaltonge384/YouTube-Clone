function Header({ onMenuClick }) {
  return (
    <header className="header">

      {/* Hamburger button */}
      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* YouTube-style logo */}
      <div className="logo">
        <span className="logo-icon">▶</span>
        <span className="logo-text">YouTube</span>
      </div>

      {/* Search bar */}
      <div className="header-search">
        <input
          type="text"
          placeholder="Search"
        />

        <button aria-label="Search">
          🔍
        </button>
      </div>

      {/* Header actions */}
      <div className="header-actions">

        <button className="header-action">
          ⬆️
        </button>

        <button className="header-action">
          🔔
        </button>

        <button className="header-action profile-button">
          👤
        </button>

      </div>

    </header>
  );
}

export default Header;

import logo from "../assets/images/iventions-logo.svg";

import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="iventions-navbar">
      <button
        type="button"
        className="iventions-menu-btn"
      >
        <span className="iventions-menu-lines">
          <span />
          <span />
        </span>

        <span className="iventions-menu-label">
          MENU
        </span>
      </button>

      <div className="iventions-logo-wrap">
        <img
          src={logo}
          alt="Iventions"
          className="iventions-logo-image"
        />
      </div>

      <button
        type="button"
        className="iventions-project-btn"
      >
        GOT A PROJECT?
      </button>
    </header>
  );
}
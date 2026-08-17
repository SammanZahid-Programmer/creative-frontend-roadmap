export default function Navbar({
  onMenu,
  soundOn,
  setSoundOn,
}) {
  return (
    <header className="navbar">

      {/* =================================================
          LOGO
      ================================================= */}

      <div className="brand">

        <img
          src="/trion_logo.png"
          alt="Trionn Logo"
          className="brand-symbol"
        />

        <img
          src="/trion_name.png"
          alt="Trionn"
          className="brand-name"
        />

      </div>


      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="nav-actions">

        {/* =================================================
            SOUND BUTTON
        ================================================= */}

        <button
          className={`sound-button ${
            soundOn
              ? "sound-on"
              : "sound-off"
          }`}
          onClick={() =>
            setSoundOn((value) => !value)
          }
          aria-label={
            soundOn
              ? "Mute sound"
              : "Unmute sound"
          }
          type="button"
        >

          <span className="speaker-icon">

            <span className="speaker-body"></span>

            <span className="speaker-cone"></span>

            <span className="sound-wave wave-one"></span>

            <span className="sound-wave wave-two"></span>

          </span>

        </button>


        {/* =================================================
            LET'S TALK
        ================================================= */}

        <button
          className="talk-button"
          type="button"
        >

          <span className="talk-default">
            LET'S TALK
          </span>

          <span className="talk-hover">
            LET'S TALK
          </span>

        </button>


        {/* =================================================
            MENU
        ================================================= */}

        <button
          className="menu-button"
          onClick={onMenu}
          type="button"
        >

          <span>MENU</span>

          <div className="menu-lines">
            <i />
            <i />
          </div>

        </button>

      </div>

    </header>
  );
}
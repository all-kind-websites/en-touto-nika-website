import { PhoneIphone, AlternateEmail } from "@material-ui/icons";

import "../styles/topbar.scss";

export default function Topbar({ menuOpen, setMenuOpen }) {
  const menuHandler = () => {
    setMenuOpen(true);
  };
  return (
    <div className={`topbar ${menuOpen && "active"} `}>
      <div className="topbar__left-wrapper">
        <div className="topbar__item">
          <a href="#hero" className="topbar__logo">
            ΕΝ ΤΟΥΤΩ ΝΙΚΑ
          </a>
        </div>
      </div>

      <div className="topbar__right__wrapper">
        <div className="topbar__hamburger" onClick={menuHandler}>
          <span className="topbar__hamburger-line-1"></span>
          <span className="topbar__hamburger-line-2"></span>
          <span className="topbar__hamburger-line-3"></span>
        </div>
      </div>
    </div>
  );
}

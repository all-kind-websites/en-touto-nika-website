import { PhoneIphone, AlternateEmail } from "@material-ui/icons";

import "../styles/topbar.scss";

export default function Topbar({ menuOpen, setMenuOpen }) {
  const menuHandler = () => {
    setMenuOpen(true);
  };
  return (
    <div className={`topbar ${menuOpen && "active"} `}>
      <div className="hamburger-container">
        <div className="hamburger-icon" onClick={menuHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="title-container">
        <h1 className="title">ΕΝ ΤΟΥΤΩ ΝΙΚΑ</h1>
      </div>
    </div>
  );
}

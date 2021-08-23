import "../styles/topbar.scss";

export default function Topbar(props: any) {
  const menuHandler = () => {
    props.setMenuOpen(true);
  };
  return (
    <div className={`topbar ${props.menuOpen && "active"} `}>
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

import { NavLink } from "react-router-dom";
import '../styles/menu.scss';

export default function Menu({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: Function }) {

  const menuHandler = () => {
    setMenuOpen(false);
  };
  return (
    <div className={`menu ${menuOpen && "active"} `}>
      <ul>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/en-touto-nika">ΕΝ ΤΟΥΤΩ ΝΙΚΑ</NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/winners">Νικητές</NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/settings">Ρυθμίσεις</NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/create">Δημιουργία</NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/logout">Έξοδος</NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/login">Είσοδος</NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/register">Εγγραφή</NavLink>
        </li>
      </ul>
    </div>
  );
};


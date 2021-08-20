import { FaHome } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { GiPodiumWinner } from 'react-icons/gi'
import { BiLogOut, BiLogIn } from 'react-icons/bi'
import { IoIosCreate } from 'react-icons/io'
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
          <NavLink className='link' onClick={menuHandler} to="/en-touto-nika">
            <FaHome className='menu-icon' /> <p> Αρχική </p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/winners">
            <GiPodiumWinner className='menu-icon' /> <p> Νικητές </p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/settings">
            <AiFillSetting className='menu-icon' /> <p>Ρυθμίσεις</p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/create">
            <IoIosCreate className='menu-icon' /> <p>Δημιουργία</p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/logout">
            <BiLogOut className='menu-icon' /> <p>Έξοδος</p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/register">
            <BiLogIn className='menu-icon' /> <p>Είσοδος</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};


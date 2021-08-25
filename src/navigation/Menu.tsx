import { FaHome } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { GiPodiumWinner } from 'react-icons/gi'
import { BiLogOut, BiLogIn } from 'react-icons/bi'
import { IoIosCreate } from 'react-icons/io'
import { NavLink } from "react-router-dom";
import '../styles/menu.scss';
import asyncNames from '../constants/asyncNames'


export default function Menu({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: Function }) {

  const userIsLoggedIn = !!localStorage.getItem(asyncNames.userData);

  const menuHandler = () => {
    setMenuOpen(false);
  };

  const logoutHandler = () => {
    setMenuOpen(false);
    localStorage.getItem(asyncNames.userData);
  };

  return (
    <div className={`menu ${menuOpen && "active"} `}>
      <ul>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/">
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
        {userIsLoggedIn ? <li>
          <NavLink className='link' onClick={logoutHandler} to="/register">
            <BiLogOut className='menu-icon' /> <p>Έξοδος</p>
          </NavLink>
        </li> : null}
        {!userIsLoggedIn ? <li>
          <NavLink className='link' onClick={menuHandler} to="/register">
            <BiLogIn className='menu-icon' /> <p>Είσοδος</p>
          </NavLink>
        </li> : null}
      </ul>
    </div>
  );
};


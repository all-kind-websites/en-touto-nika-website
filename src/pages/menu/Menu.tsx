import { NavLink } from "react-router-dom";
import { FaHome } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { GiPodiumWinner } from 'react-icons/gi'
import { BiLogOut, BiLogIn, BiDonateBlood } from 'react-icons/bi'
import { IoIosCreate } from 'react-icons/io'

import asyncNames from '../../constants/asyncNames'
import navNames from '../../constants/navNames'
import '../../styles/menu/menu.scss';


export default function Menu({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: Function }) {

  const userIsLoggedIn = !!localStorage.getItem(asyncNames.userData);

  const menuHandler = () => {
    setMenuOpen(false);
  };

  const logoutHandler = () => {
    setMenuOpen(false);
    localStorage.removeItem(asyncNames.userData);
  };

  return (
    <div className={`menu ${menuOpen ? "active" : ''}`}>
      <h1>ΕΝ ΤΟΥΤΩ ΝΙΚΑ</h1>
      <ul>
        <li>
          <NavLink className='link' onClick={menuHandler} to="/">
            <FaHome className='menu-icon' /> <p> Αρχική </p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to={navNames.winners}>
            <GiPodiumWinner className='menu-icon' /> <p> Νικητές </p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to={navNames.settings}>
            <AiFillSetting className='menu-icon' /> <p>Ρυθμίσεις</p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to={navNames.create}>
            <IoIosCreate className='menu-icon' /> <p>Δημιουργία</p>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' onClick={menuHandler} to={navNames.donate}>
            <BiDonateBlood className='menu-icon' /> <p>Δωρεά</p>
          </NavLink>
        </li>
        {userIsLoggedIn ? <li>
          <NavLink className='link' onClick={logoutHandler} to={navNames.auth}>
            <BiLogOut className='menu-icon' /> <p>Έξοδος</p>
          </NavLink>
        </li> : null}
        {!userIsLoggedIn ? <li>
          <NavLink className='link' onClick={menuHandler} to={navNames.auth}>
            <BiLogIn className='menu-icon' /> <p>Είσοδος</p>
          </NavLink>
        </li> : null}
      </ul>
    </div>
  );
};


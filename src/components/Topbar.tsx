import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BiDonateBlood } from 'react-icons/bi';
import { MdTimer, MdTimerOff } from 'react-icons/md';

import "../styles/topbar.scss";
import navNames from '../constants/navNames';

export default function Topbar(props: any) {
  const history = useHistory()

  const [timer, setTimer] = useState(false);

  const toggleTimerIcon = () => {
    setTimer(!timer);
  };
  const menuHandler = () => {
    props.setMenuOpen(true);
  };

  const donationHanlder = () => {
    history.push(navNames.donate);
    props.setMenuOpen(false);

  }
  return (
    <div className={`topbar ${props.menuOpen && "active"} `}>
      <div className="hamburger-container">
        {props.menuOpen ?
          <BiDonateBlood
            className='donate-icon'
            size='34' onClick={donationHanlder} /> :
          <div className='hamburger-icon' onClick={menuHandler}>
            <span></span>
            <span></span>
            <span></span>
          </div>}
      </div>
      <div className="title-container">
        <h1 className="title">ΕΝ ΤΟΥΤΩ ΝΙΚΑ</h1>
      </div>
      {timer ? <MdTimer className="timer-icon" size='34' onClick={toggleTimerIcon} /> : <MdTimerOff onClick={toggleTimerIcon} className="timer-icon" size='34' />}
    </div>
  );
}

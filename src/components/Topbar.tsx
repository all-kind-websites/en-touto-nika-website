import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { BiDonateBlood } from 'react-icons/bi';
import { MdTimer, MdTimerOff } from 'react-icons/md';

import "../styles/topbar.scss";
import navNames from '../constants/navNames';
import { timerState } from '../store/actions/general';

export default function Topbar(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const gameTitle = useSelector((state: RootStateOrAny) => state.general.title);
  console.log('====================================');
  console.log('gameTitle', gameTitle);
  console.log('====================================');
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    dispatch(timerState(timer))
  }, [dispatch, timer])

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
      <BiDonateBlood
        className='donate-icon-1'
        size='34' onClick={donationHanlder} />
      <div className="hamburger-container">
        <div className='hamburger-icon' onClick={menuHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="title-container">
        <h1 className={`title ${!!gameTitle ? 'title--game' : ''}`}>{!!gameTitle ? gameTitle : 'ΕΝ ΤΟΥΤΩ ΝΙΚΑ'}</h1>
      </div>
      <BiDonateBlood
        className='donate-icon-2'
        size='34' onClick={donationHanlder} />
      {timer ? <MdTimer className="timer-icon" size='34' onClick={toggleTimerIcon} /> : <MdTimerOff onClick={toggleTimerIcon} className="timer-icon" size='34' />}
    </div>
  );
}

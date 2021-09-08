import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { MdTimer, MdTimerOff } from 'react-icons/md';

import "../styles/topbar.scss";
import nav from '../constants/nav';
import { timerState } from '../store/actions/game';

export default function Topbar(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [timer, setTimer] = useState(false);

  const gameTitle = useSelector((state: RootStateOrAny) => state.game.gameTypeTitle);
  const gameOn = useSelector((state: RootStateOrAny) => state.game.gameOn);

  useEffect(() => {
    dispatch(timerState(timer))
  }, [dispatch, timer])

  const toggleTimerIcon = () => {
    setTimer(!timer);
  };
  const menuHandler = () => {
    props.setMenuOpen(true);
  };

  return (
    <div className={`topbar ${(props.menuOpen || gameOn) && "active"} `}>
      <div className="hamburger-container">
        <div className='hamburger-icon' onClick={menuHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className="title-container"
        onClick={() => history.push(nav.home)}
      >
        <h1
          className={`title ${!!gameTitle ? 'title--game' : ''}`}>
          {!!gameTitle ? gameTitle : 'ΕΝ ΤΟΥΤΩ ΝΙΚΑ'}
        </h1>
      </div>
      {timer ?
        <MdTimer className="timer-icon" size='34' onClick={toggleTimerIcon} /> :
        <MdTimerOff onClick={toggleTimerIcon} className="timer-icon" size='34' />
      }
    </div>
  );
}

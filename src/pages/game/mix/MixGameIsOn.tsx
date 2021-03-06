import { useCallback, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button';
import nav from '../../../constants/nav';
import strings from '../../../constants/strings';
import cache from '../../../utils/cache';
import { removeAsyncMultiMixed, removeAsyncTrueFalseMixed } from '../../../utils/removeAsync';
import { gameOn } from '../../../store/actions/game';
import '../../../styles/game/mix/game-is-on.css';

const MixGameIsOn = (props: any) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [hover, setHover] = useState(false);
  const [mixGameIsOn, setMixGameIsOn] = useState(false);
  const [mixGameIsOnTF, setMixGameIsOnTF] = useState(false);

  const gameType = useSelector((state: RootStateOrAny) => state.game.id);
  const timer = useSelector((state: RootStateOrAny) => state.game.timer);

  const handleHover = () => {
    setHover(!hover)
  }


  useEffect(() => {
    if (props.location.state.mixGameIsOn) {
      const isOn = props.location.state.mixGameIsOn;
      setMixGameIsOn(isOn);
    }
    if (props.location.state.mixGameIsOnTF) {
      const isOn = props.location.state.mixGameIsOnTF;
      setMixGameIsOnTF(isOn);
    }
  }, [props.location.state.mixGameIsOn, props.location.state.mixGameIsOnTF])


  const continueSameGameHanlder = useCallback(
    async () => {
      await dispatch(gameOn(true));
      if (gameType === "Multi") {
        if (timer) {
          await cache.set(strings.useTimerMultiMixed, true);
          history.replace(nav.mixMultiGameWithTimer);
        } else {
          await cache.set(strings.useTimerMultiMixed, false);
          history.replace(nav.mixMultiGameNoTimer);
        }
      } else if (gameType === "TrueFalse") {
        if (timer) {
          await cache.set(strings.useTimerTrueFalseMixed, true);
          history.replace(nav.mixTrueFalseGameWithTimer);
        } else {
          await cache.set(strings.useTimerTrueFalseMixed, false);
          history.replace(nav.mixTrueFalseGameNoTimer);
        }
      }
    }, [gameType, dispatch, history, timer])


  const startNewGameHandler = async () => {
    if (gameType === "TrueFalse") await removeAsyncTrueFalseMixed();
    else await removeAsyncMultiMixed();
    history.replace(nav.mixChooseCategories);
  }

  return (
    <article className='game-is-on' >
      <section className='game-is-on__container' >
        <p className='game-is-on__text1' >{`
?????????? ?????? ???????????????? 
${mixGameIsOn || mixGameIsOnTF ? "???? ??????????" : "?????????? ??????????"} 
?????? ???? ??????????????`}</p>
        <p className='game-is-on__text2' >{`
???????????? ???? ???????????????????? ???? ????????, 
?? ???? ???????????????????? ??????????????????; 
`}</p>
        <div className='game-is-on__buttons-container' >
          <Button
            style={{ width: 120, margin: 30 }}
            disabled={false}
            title="???? ????????"
            onClick={continueSameGameHanlder}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
          <Button
            style={{ width: 120, margin: 30 }}
            disabled={false}
            title="K????????????????"
            onClick={startNewGameHandler}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
        </div>
      </section>
    </article>
  )
}

export default withRouter(MixGameIsOn);
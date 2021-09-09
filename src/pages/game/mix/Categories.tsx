import { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import useSaveCategory from "../../../hooks/useSaveCategory";
import nav from "../../../constants/nav";
import strings from "../../../constants/strings";

import cache from "../../../utils/cache";

import CheckBox from "../../../components/CheckBox";
import Button from "../../../components/UI/Button";
import '../../../styles/game/mix/categories.scss';
import { gameOn } from "../../../store/actions/game";

const Categories = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const userIsLoggedIn = !!localStorage.getItem(strings.userData);
  const gameType = useSelector((state: RootStateOrAny) => state.game.id);
  const timer = useSelector((state: RootStateOrAny) => state.game.timer);

  // useSaveCategory
  const {
    oneIsTrue,
    twoIsTrue,
    threeIsTrue,
    fourIsTrue,
    saveOne,
    saveTwo,
    saveThree,
    saveFour,
    isLoading,
  } = useSaveCategory(gameType);

  const categoryIsChosen = oneIsTrue || twoIsTrue || threeIsTrue || fourIsTrue;

  // TODO: not needed anymore
  // keep this in case user 
  // comes back from the game
  useEffect(() => {
    dispatch(gameOn(false));
  }, [dispatch]);

  const startMixGame = async (
    gameType: string,
    timer: boolean
  ) => {
    dispatch(gameOn(true));
    if (gameType === "Multi") {
      if (timer) {
        await cache.set(strings.useTimerMultiMixed, true);
        history.replace(nav.mixMultiGameWithTimer)
      } else {
        await cache.set(strings.useTimerMultiMixed, false);
        history.replace(nav.mixMultiGameNoTimer)
      }
    } else if (gameType === "TrueFalse") {
      if (timer) {
        await cache.set(strings.useTimerTrueFalseMixed, true);
        history.replace(nav.mixTrueFalseGameWithTimer)
      } else {
        await cache.set(strings.useTimerTrueFalseMixed, false);
        history.replace(nav.mixTrueFalseGameNoTimer)
      }
    }
  };

  // TODO: add content
  if (!userIsLoggedIn) {
    return (
      <div></div>
    );
  }

  // TODO: add content
  if (isLoading && userIsLoggedIn) {
    return <div></div>
  }

  return (
    <section className='mix-categories' >
      <h4 className='mix-categories__title' > ΕΠΙΛΟΓΗ ΚΑΤΗΓΟΡΙΩΝ</h4>
      <div className={`mix-categories__container`} >
        {/* <div className={`mix-categories__container ${modalVisible ? 'not-clickable' : ''}`} > */}
        <div className='checkboxes-icon-container' >
          <section className='mix-categories__checkboxes'>
            <CheckBox checked={oneIsTrue} onChange={saveOne} text="Καινή Διαθήκη" />
            <CheckBox
              checked={twoIsTrue}
              onChange={saveTwo}
              text="Παλαιά Διαθήκη"
            />
            <CheckBox checked={threeIsTrue} onChange={saveThree} text="Συναξάρι" />
            <CheckBox
              checked={fourIsTrue}
              onChange={saveFour}
              text="Αγιοπνευματική ζωή"
            />
          </section>
          <div className='icon-container'>
            <img
              alt='Theotokos icon'
              src="assets/panagia-glykofilousa.jpg"
            />
          </div>
        </div>
        <div className='start-button'>
          <Button
            disabled={!categoryIsChosen}
            title="Εκκίνηση"
            onClick={() => {
              startMixGame(gameType, timer);
            }}
          />
        </div>
      </div>
    </section>
  );
};


export default Categories;
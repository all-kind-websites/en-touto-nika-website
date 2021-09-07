import { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import useSaveCategory from "../../../hooks/useSaveCategory";
import nav from "../../../constants/nav";
import strings from "../../../constants/strings";

import cache from "../../../utils/cache";
// import startMixGame from "../../../utils/startMixGame";
import checkIfMixGameIsOn from "../../../utils/checkIfMixGameIsOn";
import {
  removeAsyncMultiMixed,
  removeAsyncTrueFalseMixed,
} from "../../../utils/removeAsync";
import CheckBox from "../../../components/CheckBox";
import Button from "../../../components/UI/Button";
import '../../../styles/game/mix/categories.scss';
import { gameOn } from "../../../store/actions/game";

const Categories = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);

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

  // checkIfMixGameIsOn
  const {
    checking,
    mixGameIsOn,
    mixGameIsOnTF,
  } = checkIfMixGameIsOn(gameType, setModalVisible);

  useEffect(() => {
    checking();
  }, [checking,]);

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
        history.push(nav.mixMultiGameWithTimer)
      } else {
        await cache.set(strings.useTimerMultiMixed, false);
        history.push(nav.mixMultiGameNoTimer)

      }
    } else if (gameType === "TrueFalse") {
      if (timer) {
        await cache.set(strings.useTimerTrueFalseMixed, true);
        history.push(nav.mixTrueFalseGameWithTimer)
      } else {
        await cache.set(strings.useTimerTrueFalseMixed, false);
        history.push(nav.mixTrueFalseGameNoTimer)

      }
    }
  };

  if (!userIsLoggedIn) {
    return (
      <div></div>
    );
  }

  if (isLoading && userIsLoggedIn) {
    return <div></div>
  }

  return (
    <section className='mix-categories' >
      <h4 className='mix-categories__title' > ΕΠΙΛΟΓΗ ΚΑΤΗΓΟΡΙΩΝ</h4>
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
      {/* {modalVisible && (
        <CustomModal
          modalViewStyle={styles.modalView}
          buttonOneStyle={styles.buttonOne}
          buttonTwoStyle={styles.buttonTwo}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          textOne={`
Έχετε ένα παιχνίδι 
${mixGameIsOn || mixGameIsOnTF ? "(με χρόνο)" : "(χωρίς χρόνο)"} 
ήδη σε εξέλιξη. 

Θέλετε να συνεχίσετε το ίδιο, 
ή να ξεκινήσετε καινούριο; 
                        `}
          buttonOneTitle="Το ίδιο"
          onPressOne={async () => {
            setDisableTimerButton(false);
            setModalVisible(false);

            if (gameType === "Multi") {
              if (mixGameIsOn) {
                await cache.set(strings.useTimerMultiMixed, true);
                navigation.navigate({
                  name: nav.mixedMultiGame,
                  params: { gameType, timer },
                });
              } else {
                await cache.set(strings.useTimerMultiMixed, false);
                navigation.navigate({
                  name: nav.noTimerMixedGame,
                  params: { gameType, timer },
                });
              }
            } else if (gameType === "TrueFalse") {
              if (mixGameIsOnTF) {
                await cache.set(strings.useTimerTrueFalseMixed, true);
                navigation.navigate({
                  name: nav.mixedTrueFalseGame,
                  params: { gameType, timer },
                });
              } else {
                await cache.set(strings.useTimerTrueFalseMixed, false);
                navigation.navigate({
                  name: nav.noTimerTrueFalseMixedGame,
                  params: { gameType, timer },
                });
              }
            }
          }}
          buttonTwoTitle="Kαινούριο"
          onPressTwo={async () => {
            setModalVisible(false);
            if (gameType === "TrueFalse") await removeAsyncTrueFalseMixed();
            else await removeAsyncMultiMixed();
          }}
        />
      )} */}
    </section>
  );
};


export default Categories;
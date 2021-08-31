import { useState, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

import useSaveCategory from "../../../hooks/useSaveCategory";
import navNames from "../../../constants/navNames";
import asyncNames from "../../../constants/asyncNames";

import cache from "../../../utils/cache";
import startMixGame from "../../../utils/startMixGame";
import checkIfMixGameIsOn from "../../../utils/checkIfMixGameIsOn";
import {
  removeAsyncMultiMixed,
  removeAsyncTrueFalseMixed,
} from "../../../utils/removeAsync";
import CheckBox from "../../../components/CheckBox";
import Button from "../../../components/UI/Button";
import '../../../styles/game/mix/categories.scss';

const Categories = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const userIsLoggedIn = !!localStorage.getItem(asyncNames.userData);
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
  }, [checking]);

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
            startMixGame(categoryIsChosen, gameType, timer);
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
                await cache.set(asyncNames.useTimerMultiMixed, true);
                navigation.navigate({
                  name: navNames.mixedMultiGame,
                  params: { gameType, timer },
                });
              } else {
                await cache.set(asyncNames.useTimerMultiMixed, false);
                navigation.navigate({
                  name: navNames.noTimerMixedGame,
                  params: { gameType, timer },
                });
              }
            } else if (gameType === "TrueFalse") {
              if (mixGameIsOnTF) {
                await cache.set(asyncNames.useTimerTrueFalseMixed, true);
                navigation.navigate({
                  name: navNames.mixedTrueFalseGame,
                  params: { gameType, timer },
                });
              } else {
                await cache.set(asyncNames.useTimerTrueFalseMixed, false);
                navigation.navigate({
                  name: navNames.noTimerTrueFalseMixedGame,
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
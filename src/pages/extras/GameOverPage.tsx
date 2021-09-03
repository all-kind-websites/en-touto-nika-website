
import { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import navNames from "../../constants/navNames";

import '../../styles/game/pages/game-over-page.scss';

// import Colours from "../../constants/Colours";
interface GameOverPageProps {
  isUpLoading: boolean,
  minutesLeft?: number,
  saveStadiumResult: Function,
  secondsLeft?: number,
  stadiumCounter: number,
  totalPoints: number,
  timer: boolean,
}
const GameOverPage = ({
  isUpLoading,
  minutesLeft,
  saveStadiumResult,
  secondsLeft,
  stadiumCounter,
  totalPoints,
  timer,
}: GameOverPageProps) => {
  const history = useHistory();

  const [hover, setHover] = useState(false);

  const userIsLogedIn = useSelector((state: RootStateOrAny) => state.auth.userId);

  const handleHover = () => {
    setHover(!hover)
  }

  return (
    <section className='game-over' >
      <h2 className='epilogue' >Τέλος καὶ τῷ Θεῷ Δόξα!</h2>
      <h3 className='stadium' >Στάδιο: {stadiumCounter}ο</h3>
      <h4 className='grade' >Τελική βαθμολογία: {totalPoints} </h4>
      {timer && (
        <>
          <div onClick={() => {
            alert(`Η βαθμολογία προκύπτει από το άθροισμα των μονάδων 
(των σωστών απαντήσεων) 
με τον χρόνο (που απέμεινε) επί 10.`)
          }}>

            {/* <MaterialIcons
                  name="info-outline"
                  size={Math.ceil(width * 0.08)}
                  color={Colours.maroon}
                /> */}
          </div>
          <h5>
            Χρόνος που απέμεινε: {minutesLeft}': {secondsLeft}''
          </h5>
        </>
      )}
      {userIsLogedIn ? (
        <div className='instruction-text' >
          <h5>
            Αποθήκευση αποτελέσματος
          </h5>
          <h5>
            και επιστροφή στην αρχική οθόνη
          </h5>
        </div>
      ) : (
        <span>Eπιστροφή στην αρχική οθόνη:</span>
      )}
      {isUpLoading ? (
        // <ActivityIndicator size="small" color={Colours.moccasin_light} />
        <Loader />
      ) : (
        <Button
          disabled={false}
          title='Επιστροφή'
          onClick={() => history.replace(navNames.home)}
          onMouseEnter={() => handleHover()}
          onMouseLeave={() => handleHover()}
        />
      )}
    </section>
  );
};

export default GameOverPage;
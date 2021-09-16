import { Prompt } from 'react-router-dom'

import { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";

import '../../styles/game/pages/game-over.css';

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
  const [hover, setHover] = useState(false);
  const [gradeSaved, setGradeSaved] = useState(false);

  const userIsLogedIn = useSelector((state: RootStateOrAny) => state.auth.userId);

  const handleHover = () => {
    setHover(!hover)
  }

  return (
    <>
      <Prompt
        when={!gradeSaved}
        message='Αν θέλετε να αποθηκευθεί η βαθμολογία σας στη βάση δεδομένων, πατήστε εδώ άκυρο και μετά στη σελίδα το κουμπί "Αποθήκευση!" '
      />
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
          <Loader />
        ) : (
          <Button
            disabled={false}
            title='Αποθήκευση'
            onClick={() => {
              setGradeSaved(true);
              saveStadiumResult()
            }}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
        )}
      </section>
    </>
  );
};

export default GameOverPage;

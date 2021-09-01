
import { RootStateOrAny, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import navNames from "../../constants/navNames";

// import Colours from "../../constants/Colours";
interface GameOverScreenProps {
  isUpLoading: boolean,
  minutesLeft?: number,
  saveStadiumResult: Function,
  secondsLeft?: number,
  stadiumCounter: number,
  totalPoints: number,
  timer: boolean,
}
const GameOverScreen = ({
  isUpLoading,
  minutesLeft,
  saveStadiumResult,
  secondsLeft,
  stadiumCounter,
  totalPoints,
  timer,
}: GameOverScreenProps) => {
  const userIsLogedIn = useSelector((state: RootStateOrAny) => state.auth.userId);

  return (
    <section>
      <h2>Τέλος καὶ τῷ Θεῷ Δόξα!</h2>
      <h3>Στάδιο: {stadiumCounter}ο</h3>
      <h4>Τελική βαθμολογία: {totalPoints} </h4>
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
        <h6>
          Αποθήκευση αποτελέσματος και επιστροφή στην αρχική οθόνη:
        </h6>
      ) : (
        <span>Eπιστροφή στην αρχική οθόνη:</span>
      )}
      {isUpLoading ? (
        // <ActivityIndicator size="small" color={Colours.moccasin_light} />
        <Loader />
      ) : (
        <Link to={navNames.home} >
          Επιστροφή...
        </Link>
      )}
    </section>
  );
};

export default GameOverScreen;

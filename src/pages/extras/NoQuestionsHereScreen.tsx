import Button from "../../components/UI/Button";
import navNames from "../../constants/navNames";
import '../../styles/game/pages/no-questions-here.scss';

const NoQuestionsHereScreen = (props: any) => {
  return (
    <div className='no-questions-here' >
      <h4 className='text' >Δεν υπάρχουν ερωτήσεις σε αυτή την κατηγορία </h4>
      <Button

        title="Επιστροφή"
        onClick={() => props.history.push(navNames.home)}
      />
    </div>
  );
};
export default NoQuestionsHereScreen;
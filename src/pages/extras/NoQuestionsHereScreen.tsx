import Button from "../../components/UI/Button";
import nav from "../../constants/nav";
import '../../styles/game/pages/no-questions-here.css';

const NoQuestionsHereScreen = (props: any) => {
  return (
    <div className='no-questions-here' >
      <h4 className='text' >Δεν υπάρχουν ερωτήσεις σε αυτή την κατηγορία </h4>
      <Button

        title="Επιστροφή"
        onClick={() => props.history.push(nav.home)}
      />
    </div>
  );
};
export default NoQuestionsHereScreen;
import { Link } from "react-router-dom";
import navNames from "../../constants/navNames";

// import Colours from "../../constants/Colours";
const NoQuestionsHereScreen = () => {
  return (
    <div>
      <h4>Δεν υπάρχουν ερωτήσεις σε αυτή την κατηγορία </h4>
      <Link to={navNames.home} >
        Επιστροφή...
      </Link>
    </div>
  );
};
export default NoQuestionsHereScreen;
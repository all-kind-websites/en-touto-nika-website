
// import Colours from "../../constants/Colours";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import navNames from "../../constants//navNames";

const DownloadErrorScreen = ({
  loadQuestions,
}: any) => {
  return (
    <section>
      <h4>Σφάλμα στη διαδικασία φορτώσεως των ερωτήσεων.</h4>
      <h5>Παρακαλούμε ελέγξτε τη σύνδεσή σας.</h5>
      <Button
        disabled={false}
        title="Δοκιμάστε Ξανά"
        onClick={loadQuestions} />
      <Link to={navNames.home} >
        Επιστροφή...
      </Link>
    </section>
  );
};
export default DownloadErrorScreen;
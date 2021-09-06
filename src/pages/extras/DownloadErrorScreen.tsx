
// import Colours from "../../constants/Colours";
import Button from "../../components/UI/Button";
import navNames from "../../constants//navNames";
import '../../styles/game/pages/download-error.scss';

const DownloadErrorScreen = ({
  loadQuestions,
  history
}: any) => {
  return (
    <section className='download-error' >
      <h3 className='text1' >Σφάλμα στη διαδικασία φορτώσεως των ερωτήσεων</h3>
      <h4 className='text2' >Παρακαλούμε ελέγξτε τη σύνδεσή σας</h4>
      <Button
        disabled={false}
        title="Δοκιμάστε Ξανά"
        onClick={loadQuestions} />
      <Button
        disabled={false}
        title="Επιστροφή"
        onClick={() => history.push(navNames.home)} />
    </section>
  );
};
export default DownloadErrorScreen;
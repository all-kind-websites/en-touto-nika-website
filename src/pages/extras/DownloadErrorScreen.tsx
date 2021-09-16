
// import Colours from "../../constants/Colours";
import Button from "../../components/UI/Button";
import nav from "../../constants//nav";
import '../../styles/game/pages/download-error.css';

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
        onClick={() => history.push(nav.home)} />
    </section>
  );
};
export default DownloadErrorScreen;
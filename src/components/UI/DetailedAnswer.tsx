
import Line from "../../components/UI/Line";
import LinkText from "./LinkText";

const DetailedAnswer = ({ selectedQuestion }: any) => {
  return (
    <section >
      <h5 >Απάντηση:</h5>
      <p >{selectedQuestion.answer}</p>
      {/* Put here a Link */}
      <div >
        {!!selectedQuestion.source ? <LinkText>{selectedQuestion.source}</LinkText> : null}
      </div>
      <Line />
    </section>
  );
};


export default DetailedAnswer;
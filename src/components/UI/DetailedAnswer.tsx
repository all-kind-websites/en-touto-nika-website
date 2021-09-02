import '../../styles/UI/detailed-answer.scss';

import Line from "../../components/UI/Line";
import LinkText from "./LinkText";

const DetailedAnswer = ({ selectedQuestion }: any) => {
  return (
    <section className='detailed-answer' >
      <h5 className='title' >Απάντηση:</h5>
      <p className='answer-text' >{selectedQuestion.answer}</p>
      {/* Put here a Link */}
      <a
        className='link'
        href={selectedQuestion.source}
        rel="noreferrer"
        target='_blank'
      >
        {!!selectedQuestion.source ?
          <LinkText>
            {selectedQuestion.source.match(/(?<=www.|\.).*(?=\/|\.)/g)}
            ...
          </LinkText> :
          null
        }
      </a>
      <Line />
    </section >
  );
};


export default DetailedAnswer;
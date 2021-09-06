import { MdQueuePlayNext } from 'react-icons/md'

import Line from "../../components/UI/Line";
import LinkText from "./LinkText";

import '../../styles/UI/detailed-answer.scss';

const DetailedAnswer = ({ selectedQuestion, onRefresh }: any) => {

  return (
    <section className='detailed-answer' >
      <Line className='line' />
      <div onClick={() => onRefresh()} >
        <MdQueuePlayNext className='icon-show-next' />
      </div>
      <h3 className='title' >Απάντηση:</h3>
      <div className='answer-text'
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {selectedQuestion.answer}
      </div>
      <div className='link' >
        <a
          className='link__anchor'
          href={selectedQuestion.source}
          rel="noreferrer"
          target='_blank'
        >
          {!!selectedQuestion.source ?
            <LinkText>
              {selectedQuestion.source.match(/(?<=www.|\.).*(?=\.)/g)}
              ...
            </LinkText> :
            null
          }
        </a>
      </div>
    </section >
  );
};


export default DetailedAnswer;
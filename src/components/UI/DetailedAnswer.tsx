import { MdQueuePlayNext } from 'react-icons/md'
import { SiGitea } from 'react-icons/si';

import Line from "../../components/UI/Line";
import LinkText from "./LinkText";

import nav from '../../constants/nav';
import '../../styles/UI/detailed-answer.css';
import { removeChoicesfromAsyncStorage } from '../../utils/removeAsync';

const DetailedAnswer = ({ history, selectedQuestion, onRefresh }: any) => {

  const breakHandler = async () => {
    removeChoicesfromAsyncStorage();
    history.replace(nav.home);
  }
  return (
    <section className='detailed-answer' >
      <div className='icons-container' >
        <SiGitea
          onClick={breakHandler}
          className="break-icon"
        />
        <div onClick={() => onRefresh()} >
          <MdQueuePlayNext className='icon-show-next' />
        </div>
      </div>
      <h3 className='title' >Απάντηση</h3>

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
      <div className='icons-container' >
        <SiGitea
          onClick={breakHandler}
          className="break-icon"
        />
        <div onClick={() => onRefresh()} >
          <MdQueuePlayNext className='icon-show-next' />
        </div>
      </div>
      <Line className='line' />
    </section >
  );
};


export default DetailedAnswer;
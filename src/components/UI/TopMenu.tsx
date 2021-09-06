import { RootStateOrAny, useSelector } from 'react-redux';
import strings from '../../constants/strings';
import { store } from '../../index';
import '../../styles/UI/top-menu.scss';

interface TopMenuProps {
  categoryTitle: string,
  numOfDownloadedQuestions: number,
  numOfTotalQuestions: number,
}
const TopMenu = ({
  categoryTitle,
  numOfDownloadedQuestions,
  numOfTotalQuestions,
}: TopMenuProps) => {
  const pointsType = useSelector((state: RootStateOrAny) => state.game.pointsType);
  const pointsMultiMixed = useSelector((state: RootStateOrAny) => state.game.pointsMultiMixed);
  const pointsTrueFalseMixed = useSelector((state: RootStateOrAny) => state.game.pointsTrueFalseMixed);
  let totalPoints = 0

  if (pointsType === strings.pointsTypeMultiMixed)
    totalPoints = pointsMultiMixed;
  if (pointsType === strings.pointsTypeTrueFalseMixed)
    totalPoints = pointsTrueFalseMixed;

  return (
    <article className='top-menu' >
      <h3 className='category-title' >
        {categoryTitle}
      </h3>
      <div className='questions-container' >
        <h4 >Ερωτήσεις</h4>
        <h5 >
          {numOfTotalQuestions} / {numOfDownloadedQuestions - 1}
        </h5>
      </div>
      <div className='icon-container' >
        <img
          src="assets/panagia-glykofilousa.jpg"
          alt='icon of Theotokos'
        />
      </div>
      <div className='right-container' >
        <h4 >Σωστές</h4>
        <h5 >{totalPoints}</h5>
      </div>
    </article >
  );
};

export default TopMenu;
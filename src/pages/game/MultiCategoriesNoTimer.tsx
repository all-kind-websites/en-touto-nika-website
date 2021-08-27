import { RootStateOrAny } from 'react-redux'
import '../../styles/game/multi-categories-no-timer.scss'
import { useSelector } from 'react-redux';

export default function MultiCategoriesNoTimer() {
  const gameTitle = useSelector((state: RootStateOrAny) => state.general.title);

  console.log('====================================');
  console.log(gameTitle);
  console.log('====================================');
  return (
    <div className='multi-categories-no-timer' >
      <p>{gameTitle}</p>
    </div>
  )
}

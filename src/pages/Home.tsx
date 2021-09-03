import { useEffect } from 'react';

import GAME_TYPES from '../data/game-types';

import GridItemHome from '../components/grid-items/GridItemHome';
import '../styles/home.scss';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import navNames from '../constants/navNames';
import { gameOn, gameState, gameTypeTitle, savePointsType } from '../store/actions/game';

interface Item {
  id: string,
  title: string
}

export default function Home(props: any) {
  const dispatch = useDispatch();
  const timer = useSelector((state: RootStateOrAny) => state.game.timer);
  const history = useHistory();

  useEffect(() => {
    dispatch(gameTypeTitle(''))
    dispatch(gameOn(false)); // to reveal the Topbar
    dispatch(savePointsType(''))

  }, [dispatch])

  const playHandler = async (item: Item) => {
    if (timer) {
      if (item.id === "Multi") {
        await dispatch(gameState(item.id, item.title));
        history.push(navNames.multiCategories);
      } else if (item.id === "TrueFalse") {
        await dispatch(gameState(item.id, item.title));
        history.push(navNames.trueFalseCategories);
      }
    } else {
      if (item.id === "Multi") {
        await dispatch(gameState(item.id, item.title));
        history.push(navNames.multiCategoriesNoTimer);
      } else if (item.id === "TrueFalse") {
        await dispatch(gameState(item.id, item.title));
        history.push(navNames.trueFalseCategoriesNoTimer);
      }
    }
  };

  return (
    <div className='home'>
      <ul  >
        {GAME_TYPES.map((game: { id: string, title: string }) =>
          <GridItemHome
            key={game.id}
            id={game.id}
            title={game.title}
            onClick={playHandler.bind(null, game)}
          />
        )}
      </ul>
    </div>
  )
}

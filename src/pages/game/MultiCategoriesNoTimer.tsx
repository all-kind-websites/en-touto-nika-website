import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import CategoryGridTileNoTimer from '../../components/grid-items/CategoryGridTileNoTimer';

// import GridItemHome from '../../components/grid-items/GridItemHome';
// import renderGridItemHandler from '../../components/grid-items/renderGridItemHandler';
import navNames from '../../constants/navNames';
import { CATEGORIES } from '../../data/categories';
import { gameTypeTitle } from '../../store/actions/game';
import '../../styles/game/multi-categories-no-timer.scss'
import getGameStatusMulti from '../../utils/getGameStatusMulti';
// import { GameStatusMulti } from '../../components/grid-items/imageHandler';

// interface GameStatusMulti {
//   questionsMultiOne: boolean,
//   questionsMultiTwo: boolean,
//   questionsMultiThree: boolean,
//   questionsMultiFour: boolean,
//   questionsMultiOneNoTimer: boolean,
//   questionsMultiTwoNoTimer: boolean,
//   questionsMultiThreeNoTimer: boolean,
//   questionsMultiFourNoTimer: boolean,
// }

const MultiCategoriesNoTimer = (props: any): any => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [gamesStatus, setGamesStatus] = useState<any>({});
  // const [gamesStatus, setGamesStatus] = useState<GameStatusMulti>({
  //   questionsMultiOne: false,
  //   questionsMultiTwo: false,
  //   questionsMultiThree: false,
  //   questionsMultiFour: false,
  //   questionsMultiOneNoTimer: false,
  //   questionsMultiTwoNoTimer: false,
  //   questionsMultiThreeNoTimer: false,
  //   questionsMultiFourNoTimer: false,
  // });
  const timer = useSelector((state: RootStateOrAny) => state.game.timer);

  useEffect(() => {
    dispatch(gameTypeTitle('Πολλαπλών Επιλογών'))
  }, [dispatch])

  useEffect(() => {
    getGameStatusMulti(setGamesStatus);
  }, []);


  return (
    <div className='multi-categories-no-timer'>
      <ul>
        {CATEGORIES.map((game: { id: string, title: string }) =>
          <CategoryGridTileNoTimer
            key={game.id}
            gamesStatus={gamesStatus}
            id={game.id}
            navigationName={navNames.multiGameNoTimer}
            timer={timer}
            title={game.title}
            onClick={() => {
              console.log('......getNavName', game.id);

              const getNavigationName = () =>
                game.id === "mixed" ? navNames.mixChooseCategories : navNames.multiGameNoTimer;

              history.push(getNavigationName())
            }
            }
          // () =>
          // navigation.navigate({
          //   name: getNavigationName(),
          //   params: {
          //     categoryId: game.id,
          //     categoryTitle: game.title,
          //     timer,
          //     gameType,
          //   },
          // })
          // }
          />
        )}
      </ul>
    </div>
  )
}

export default MultiCategoriesNoTimer;
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import CategoryGridTileNoTimer from '../../components/grid-items/CategoryGridTileNoTimer';

// import GridItemHome from '../../components/grid-items/GridItemHome';
// import renderGridItemHandler from '../../components/grid-items/renderGridItemHandler';
import nav from '../../constants/nav';
import { CATEGORIES } from '../../data/categories';
import { gameTypeTitle } from '../../store/actions/game';
import '../../styles/game/multi-categories-no-timer.css'
import getGameStatusMulti from '../../utils/getGameStatusMulti';
import cache from '../../utils/cache';
import strings from '../../constants/strings';
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

  const [mixGameIsOn, setMixGameIsOn] = useState(false);
  const [mixGameIsOnNoTimer, setMixGameIsOnNoTimer] = useState(false);
  const [mixGameIsOnTF, setMixGameIsOnTF] = useState(false);
  const [mixGameIsOnTFNoTimer, setMixGameIsOnTFNoTimer] = useState(false);
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
  const gameType = useSelector((state: RootStateOrAny) => state.game.id);

  const checking = async () => {
    if (gameType === "Multi") {
      if (timer) {
        const isOn = await cache.get(strings.mixGameIsOnMulti);
        setMixGameIsOn(isOn)
      } else {
        const isOn = await cache.get(strings.mixGameIsOnMultiNoTimer);
        setMixGameIsOnNoTimer(isOn)
      }
    } else if (gameType === "TrueFalse") {
      if (timer) {
        const isOn = await cache.get(strings.mixGameIsOnTrueFalse);
        setMixGameIsOnTF(isOn)
      } else {
        const isOn = await cache.get(strings.mixGameIsOnTrueFalseNoTimer);
        setMixGameIsOnTFNoTimer(isOn)
      }
    }
  }

  useEffect(() => {
    checking();
  });

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
            navigationName={nav.multiGameNoTimer}
            timer={timer}
            title={game.title}
            onClick={() => {
              const getNavigationName = () => {
                if (mixGameIsOn ||
                  mixGameIsOnNoTimer ||
                  mixGameIsOnTF ||
                  mixGameIsOnTFNoTimer) return {
                    pathname: nav.mixGameIsOn,
                    state: {
                      mixGameIsOn,
                      mixGameIsOnNoTimer,
                      mixGameIsOnTF,
                      mixGameIsOnTFNoTimer
                    }
                  }
                if (game.id === "mixed") return nav.mixChooseCategories
                else return nav.multiGameNoTimer;
              }
              history.push(getNavigationName())
            }
            }
          />
        )}
      </ul>
    </div>
  )
}

export default MultiCategoriesNoTimer;
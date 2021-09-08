import { useEffect, useState } from 'react';

import GAME_TYPES from '../data/game-types';

import GridItemHome from '../components/grid-items/GridItemHome';
import '../styles/home.scss';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import nav from '../constants/nav';
import { gameOn, gameState, gameTypeTitle, savePointsType } from '../store/actions/game';

import Loader from '../components/UI/Loader';
import tryLogin from '../utils/tryLogin';

interface Item {
  id: string,
  title: string
}

export default function Home(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState(); // error initially is undefined!


  const timer = useSelector((state: RootStateOrAny) => state.game.timer);
  const triedAutoLogin = useSelector((state: RootStateOrAny) => state.auth.triedAutoLogin)
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.token)

  useEffect(() => {
    dispatch(gameTypeTitle(''))
    dispatch(gameOn(false)); // to reveal the Topbar
    dispatch(savePointsType(''))

  }, [dispatch])

  useEffect(() => {
    // tryLogin checks if users token is valid
    // and if not it gets a new one
    tryLogin(setError);
  }, []);

  const playHandler = async (item: Item) => {
    if (timer) {
      if (item.id === "Multi") {
        await dispatch(gameState(item.id, item.title));
        history.push(nav.multiCategories);
      } else if (item.id === "TrueFalse") {
        await dispatch(gameState(item.id, item.title));
        history.push(nav.trueFalseCategories);
      }
    } else {
      if (item.id === "Multi") {
        await dispatch(gameState(item.id, item.title));
        history.push(nav.multiCategoriesNoTimer);
      } else if (item.id === "TrueFalse") {
        await dispatch(gameState(item.id, item.title));
        history.push(nav.trueFalseCategoriesNoTimer);
      }
    }
  };

  if (error) {
    return (
      <div>
        <div >
          <h3>
            Σφάλμα στη διαδικασία εκκινήσεως του παιχνιδιού. Παρακαλούμε ελέγξτε
            τη σύνδεσή σας.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className='home'>
      {!triedAutoLogin || !isAuth ?
        <div className='home-loader' >
          <Loader />
        </div>
        : null}
      <ul className='home__list' >
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

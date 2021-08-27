// import { useEffect } from 'react';

import GAME_TYPES from '../data/game-types';

import GridItemHome from '../components/grid-items/GridItemHome';
import '../styles/home.scss';

export default function Home(props: any) {

  return (
    <ul className='home' >
      {GAME_TYPES.map((game: { id: string, title: string }) => <GridItemHome key={game.id} id={game.id} title={game.title} />)}
    </ul>
  )
}

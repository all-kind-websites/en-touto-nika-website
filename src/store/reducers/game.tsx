import { LOGIN_MODE, GAME_STATE, TIMER_STATE, GAME_TYPE_TITLE } from '../actions/game';
interface Action {
  type: string,
  mode: boolean,
  timer: boolean
  title: string,
  gameTypeTitle: string,
  id: string,
}

const initialState = {
  mode: true,
  timer: false
}

const game = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_MODE:
      return {
        ...state,
        mode: action.mode
      }
    case TIMER_STATE:
      return {
        ...state,
        timer: action.timer,
      }
    case GAME_STATE:
      return {
        ...state,
        id: action.id,
        title: action.title
      }
    case GAME_TYPE_TITLE:
      return {
        ...state,
        gameTypeTitle: action.title
      }

    default:
      return state;
  }
}

export default game;
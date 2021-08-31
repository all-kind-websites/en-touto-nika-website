import { LOGIN_MODE, GAME_STATE, TIMER_STATE, GAME_TYPE_TITLE, GAME_ON } from '../actions/game';
interface Action {
  type: string,
  mode: boolean,
  timer: boolean
  title: string,
  gameTypeTitle: string,
  id: string,
  gameOn: boolean
}

const initialState = {
  mode: true,
  timer: false,
  title: '',
  gameTypeTitle: '',
  id: '',
  gameOn: false
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
    case GAME_ON:
      return {
        ...state,
        gameOn: action.gameOn
      }

    default:
      return state;
  }
}

export default game;
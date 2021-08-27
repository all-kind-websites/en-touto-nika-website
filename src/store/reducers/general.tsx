import { LOGIN_MODE, GAME_STATE, TIMER_STATE } from '../actions/general';
interface Action {
  type: string,
  mode: boolean,
  timer: boolean
  title: string,
  id: string,
}

const initialState = {
  mode: true,
  timer: false
}

const general = (state = initialState, action: Action) => {
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

    default:
      return state;
  }
}

export default general;
import strings from '../../constants/strings';
import { LOGIN_MODE, GAME_STATE, TIMER_STATE, GAME_TYPE_TITLE, GAME_ON, SAVE_POINTS, SAVE_POINTS_TYPE } from '../actions/game';
interface Action {
  type: string,
  mode: boolean,
  timer: boolean
  title: string,
  gameTypeTitle: string,
  id: string,
  gameOn: boolean,
  points: number,
  pointsType: string,
}

const initialState = {
  mode: true,
  timer: false,
  title: '',
  gameTypeTitle: '',
  id: '',
  gameOn: false,
  pointsMultiMixed: 0,
  pointsTrueFalseMixed: 0,
  pointsType: '',
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
    case SAVE_POINTS:
      if (action.pointsType === strings.pointsTypeMultiMixed) {
        return {
          ...state,
          pointsMultiMixed: action.points,
          pointsType: strings.pointsTypeMultiMixed
        }
      }
      if (action.pointsType === strings.pointsTypeTrueFalseMixed) {
        return {
          ...state,
          pointsTrueFalseMixed: action.points,
          pointsType: strings.pointsTypeTrueFalseMixed
        }
      }
      return { ...state }
    case SAVE_POINTS_TYPE:
      return {
        ...state,
        pointsType: action.pointsType
      }

    default:
      return state;
  }
}

export default game;
import { LOGIN_MODE } from '../actions/general';

const initialState = {
  mode: true
}

const general = (state = initialState, action: { type: string, mode: boolean }) => {
  switch (action.type) {
    case LOGIN_MODE:
      return {
        ...state,
        mode: action.mode
      }

    default:
      return state;
  }
}

export default general;
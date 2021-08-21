import { FETCH_All_USERS_DATA } from "../actions/data/mixedData";

const initialState = {
  allUsersData: {}
};

const data = (state = initialState, action: { type: string, allUsersData: object }) => {
  switch (action.type) {
    case FETCH_All_USERS_DATA:
      return {
        ...state,
        allUsersData: action.allUsersData
      };

    default:
      return state; // is actually first reached when app starts
  }
};

export default data;

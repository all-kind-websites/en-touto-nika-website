import {
  AUTHENTICATE,
  LOG_OUT,
  USER_PROFILE_PICTURE_URL,
  USERS_PROFILE_PICTURE_URLS,
  USERS_NAMES,
  TRIED_AUTOLOGIN,
  ALLOW_ENTRANCE,
  SET_SKIP_INTRO_SCREEN,
  FORGOT_PASSWORD,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  email: "",
  triedAutoLogin: false,
  allowEntrance: false,
  forgotPassword: false,
  userProfilePictureUrl: null,
  usersProfilePictureUrls: null,
  usersNames: null,
};


const auth = (state = initialState, action: {
  type: string,
  token?: string,
  userId?: string,
  email?: string,
  userEmail?: string,
  triedAutoLogin?: boolean,
  allowEntrance?: boolean,
  forgotPassword?: boolean,
  usersProfilePictureUrls?: string,
  usersNames?: Array<string>,
  set?: boolean,
  userProfilePictureUrl?: string
}) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.userEmail,
        triedAutoLogin: true,
      };
    case TRIED_AUTOLOGIN:
      return {
        ...state,
        triedAutoLogin: action.set,
      };
    case ALLOW_ENTRANCE:
      return {
        ...state,
        allowEntrance: action.set,
      };
    case SET_SKIP_INTRO_SCREEN:
      return {
        ...state,
        skipIntroScreen: action.set,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.set,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
        triedAutoLogin: false,
      };
    case USER_PROFILE_PICTURE_URL:
      return {
        ...state,
        userProfilePictureUrl: action.userProfilePictureUrl,
      };
    case USERS_PROFILE_PICTURE_URLS:
      return {
        ...state,
        usersProfilePictureUrls: action.usersProfilePictureUrls,
      };
    case USERS_NAMES:
      return {
        ...state,
        usersNames: action.usersNames,
      };
    default:
      return state;
  }
};

export default auth;
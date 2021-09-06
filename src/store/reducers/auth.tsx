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
  allowEntrance: false,
  email: "",
  forgotPassword: false,
  set: false,
  token: '',
  triedAutoLogin: false,
  userId: '',
  userProfilePictureUrl: '',
  usersNames: '',
  usersProfilePictureUrls: '',
};


const auth = (state = initialState, action: {
  allowEntrance?: boolean,
  email?: string,
  forgotPassword?: boolean,
  set?: boolean,
  token?: string,
  triedAutoLogin?: boolean,
  type: string,
  userEmail?: string,
  userId?: string,
  userProfilePictureUrl?: string
  usersNames?: Array<string>,
  usersProfilePictureUrls?: string,
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
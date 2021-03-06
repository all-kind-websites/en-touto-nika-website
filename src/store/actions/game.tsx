export const LOGIN_MODE = 'LOGIN_MODE';
export const TIMER_STATE = 'TIMER_STATE';
export const GAME_STATE = 'GAME_STATE';
export const GAME_TYPE_TITLE = 'GAME_TYPE_TITLE';
export const GAME_ON = 'GAME_ON';
export const SAVE_POINTS = 'SAVE_POINTS';
export const SAVE_POINTS_TYPE = 'SAVE_POINTS_TYPE';

export const loginMode = (mode: boolean) => {
  return {
    type: LOGIN_MODE,
    mode
  }
}

export const timerState = (timer: boolean,) => {
  return {
    type: TIMER_STATE,
    timer,
  }
}

export const gameState = (id: string, title: string) => {
  return {
    type: GAME_STATE,
    id,
    title
  }
}

export const gameTypeTitle = (title: string) => {
  return {
    type: GAME_TYPE_TITLE,
    title
  }
}

export const gameOn = (gameOn: boolean) => {
  return {
    type: GAME_ON,
    gameOn
  }
}

export const savePoints = (points: number, pointsType: string) => {
  return {
    type: SAVE_POINTS,
    points,
    pointsType
  }
}

export const savePointsType = (pointsType: string) => {
  return {
    type: SAVE_POINTS_TYPE,
    pointsType
  }
}



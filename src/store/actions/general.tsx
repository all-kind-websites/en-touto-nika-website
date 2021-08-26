export const LOGIN_MODE = 'LOGIN_MODE';

export const loginMode = (mode: boolean) => {
  return {
    type: LOGIN_MODE,
    mode
  }
}
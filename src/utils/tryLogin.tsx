import * as authActions from "../store/actions/auth";
import strings from '../constants/strings';
import { store } from "../store/configureStore";

const tryLogin = async (setError: Function) => {
  try {
    const userData = await localStorage.getItem(strings.userData);

    if (!userData) {
      store.dispatch(authActions.triedAutoLogin(true));
      return;
    }

    const transformedData = JSON.parse(userData);
    const { token, userId, userEmail, expiryDate } = transformedData;
    const expirationDate = new Date(expiryDate); // expiryDate is string in ISO format...
    // console.log("user ID", userId);

    if (expirationDate <= new Date() || !token || !userId) {
      // if (true) {
      const refreshToken = await localStorage.getItem(strings.refreshToken);
      if (!!refreshToken)
        store.dispatch(authActions.refreshData(refreshToken));
    } else {
      store.dispatch(
        authActions.authenticate(token, userId, expiryDate, userEmail)
      );
    }
  } catch (err) {
    setError(err.message);
  }
};

export default tryLogin;
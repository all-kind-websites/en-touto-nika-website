import asyncNames from "../../constants/asyncNames";
import API_KEY from "../../../api_key";
// import firebase from "../../firebase/firebase";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";
export const USER_PROFILE_PICTURE_URL = "USER_PROFILE_PICTURE_URL";
export const USERS_PROFILE_PICTURE_URLS = "USERS_PROFILE_PICTURE_URLS";
export const USERS_NAMES = "USERS_NAMES";
export const TRIED_AUTOLOGIN = "TRIED_AUTOLOGIN";
export const ALLOW_ENTRANCE = "ALLOW_ENTRANCE";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const SET_SKIP_INTRO_SCREEN = "SET_SKIP_INTRO_SCREEN";


// For Navigation
export const forgotPassword = (set: boolean) => {
  return {
    type: FORGOT_PASSWORD,
    set,
  };
};
export const allowEntrance = (set: boolean) => {
  return {
    type: ALLOW_ENTRANCE,
    set,
  };
};
export const triedAutoLogin = (set: boolean) => {
  return {
    type: TRIED_AUTOLOGIN,
    set,
  };
};
export const authenticate = (token: string, userId: string, expiryTime: number, userEmail?: string) => {
  return (dispatch: Function) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token,
      userId,
      userEmail,
    });
  };
};

export const signup = (email: string, password: string) => {
  return async (dispatch: Function) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Σφάλμα κατά την διαδικασία εγγραφής!";
      if (errorId === "EMAIL_EXISTS") {
        message = "Αυτή η ηλεκτρονική διεύθυνση ήδη υπάρχει!";
      } else if (errorId === "OPERATION_NOT_ALLOWED") {
        message =
          "Η δυνατότητα σύνδεσης με ηλεκτρονική διεύθυνση έχει απενεργοποιηθεί!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message =
          "Έχουν μπλοκαριστεί όλες οι προσπάθειες από αυτή την συσκευή, λόγω ασυνήθηστων ενεργειών!";
      }
      throw new Error(message);
    }

    const resData = await response.json(); // transforms the data from json to javascript object
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000,
        email
      )
    );
    // The first new Date converts the second's huge number of miliseconds in a concrete date.
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      resData.email,
      resData.refreshToken
    );
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Σφάλμα κατά την διαδικασία σύνδεσης!";
        if (errorId === "EMAIL_NOT_FOUND") {
          message = "Η ηλεκτρονική διεύθυνση δεν βρέθηκε!";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "Αυτός ο κωδικός είναι άκυρος!";
        } else if (errorId === "USER_DISABLED") {
          message = "Ο λογαριασμός σας έχει απενεργοποιηθεί!";
        }
        throw new Error(message);
      }
      const resData = await response.json(); // transforms the data from json to javascript object

      dispatch(
        authenticate(
          resData.idToken,
          resData.localId,
          parseInt(resData.expiresIn) * 1000,
          email
        )
      );
      // const expirationDate = new Date(new Date().getTime() + 20 * 1000);

      // The first new Date converts the second's huge number of miliseconds in a concrete date.
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        expirationDate,
        resData.email,
        resData.refreshToken
      );
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch: Function) => {
    await localStorage.removeItem(asyncNames.userData);
    await localStorage.removeItem(asyncNames.refreshToken);

    // await localStorage.removeItem('dataIsLoaded');
    // clearLogoutTimer();
    dispatch({ type: LOG_OUT });
  };
};

// const clearLogoutTimer = () => {
// 	if (timer) {
// 		clearTimeout(timer);
// 	}
// };

// This is for automatic logging out the user...
// Gets dispatched in `authenticate` action
// const setLogoutTimer = (expirationTime) => {
// 	return (dispatch: Function) => {
// 		timer = setTimeout(() => {
// 			dispatch(logout());
// 		}, expirationTime);
// 	};
// };

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date,
  email: string,
  refreshToken: string
) => {
  const _storeData = async () => {
    try {
      // email is undefined if we come here from refreshData.
      // So we get it from localStorage
      if (email === undefined) {
        const userData = await localStorage.getItem(asyncNames.userData);
        let oldEmail = "";
        if (userData) {
          // parse converts a string to an object or array
          const transformedData = JSON.parse(userData);
          const { userEmail } = transformedData;
          oldEmail = userEmail;
        }
        await localStorage.removeItem(asyncNames.userData);
        await localStorage.setItem(
          asyncNames.userData,
          // stringify converts an object to a string
          JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(), // convert it to a string in a standardize format
            userEmail: oldEmail, // for showing on every screen
          })
        );
      } else {
        await localStorage.removeItem(asyncNames.userData);
        // data must be in string format!
        await localStorage.setItem(
          asyncNames.userData,
          // stringify converts an object to a string
          JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(), // convert it to a string in a standardize format
            userEmail: email, // for showing on every screen
          })
        );
      }

      await localStorage.setItem(asyncNames.refreshToken, refreshToken);
    } catch (error) {
      // Error saving data
    }
  };
  _storeData();
};

export const refreshData = (refreshToken: string) => {
  return async (dispatch: Function) => {
    try {
      // console.log('refreshData', refreshToken);

      const response = await fetch(
        "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=refresh_token&refresh_token=" + refreshToken,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η ανανέωση των δεδομένων σύνδεσης στο λογαριασμό σας δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }

      const resData = await response.json(); // transforms the data from json to javascript object
      // console.log('resData', !!resData);

      dispatch(
        authenticate(
          resData.id_token,
          resData.user_id,
          parseInt(resData.expires_in) * 1000
        )
      );
      // The first new Date converts the second's huge number of miliseconds in a concrete date.

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expires_in) * 1000
      );
      // const expirationDate = new Date(new Date().getTime() + 20 * 1000);
      // console.log('resData refreshData', resData.refresh_token);

      saveDataToStorage(
        resData.id_token,
        resData.user_id,
        expirationDate,
        resData.email,
        resData.refresh_token
      );
    } catch (error) {
      throw error;
    }
  };
};

//////////////////////////////////////////

export const changeEmail = (email: string) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      // console.log("changeEmail", email);
      const token = getState().auth.token;
      //   console.log(token);

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
        API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            email: email,
            returnSecureToken: true,
          }),
        }
      );
      // console.log(response);

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Σφάλμα κατά την διαδικασία σύνδεσης!";
        if (errorId === "EMAIL_EXISTS") {
          message = "Αυτή η ηλεκτρονική διεύθυνση ήδη υπάρχει!";
        } else if (errorId === "INVALID_ID_TOKEN") {
          message =
            "Τεκμήριο άκυρο. Παρακαλώ αποσυνδεθείτε, μετά συνδεθείτε και δοκιμάστε ξανά.";
        }
        throw new Error(message);
      }
      const resData = await response.json(); // transforms the data from json to javascript object

      dispatch(
        authenticate(
          resData.idToken,
          resData.localId,
          parseInt(resData.expiresIn) * 1000,
          email
        )
      );
      // const expirationDate = new Date(new Date().getTime() + 20 * 1000);

      // The first new Date converts the second's huge number of miliseconds in a concrete date.
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        expirationDate,
        resData.email,
        resData.refreshToken
      );
    } catch (error) {
      throw error;
    }
  };
};

export const changePassword = (password: string) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
        API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      console.log(response.ok);

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Σφάλμα κατά την διαδικασία σύνδεσης!";
        if (errorId === "INVALID_ID_TOKEN") {
          message =
            "Τεκμήριο άκυρο. Παρακαλώ αποσυνδεθείτε, μετά συνδεθείτε και δοκιμάστε ξανά. ";
        } else if (errorId === "WEAK_PASSWORD") {
          message = "Ο κωδικός θα πρέπει να έχει τουλάχιστον 6 γράμματα! ";
        }
        throw new Error(message);
      }
      const resData = await response.json(); // transforms the data from json to javascript object

      dispatch(
        authenticate(
          resData.idToken,
          resData.localId,
          parseInt(resData.expiresIn) * 1000
        )
      );
      // const expirationDate = new Date(new Date().getTime() + 20 * 1000);

      // The first new Date converts the second's huge number of miliseconds in a concrete date.
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        expirationDate,
        resData.email,
        resData.refreshToken
      );
    } catch (error) {
      throw error;
    }
  };
};

export const changeUserName = (userName: string) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;

      // First check if there is already a userName in Database saved.
      // Delete the old one and post the new one.
      const fetchResponse = await fetch(
        `https://en-touto-nika.firebaseio.com//usersNames/${userId}.json`
      );

      if (!fetchResponse.ok) {
        throw new Error(
          "Δυστυχώς η εύρεση του ονόματος χρήστη δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const fetchResponseResData = await fetchResponse.json();

      if (!!fetchResponseResData) {
        const deleteResponse = await fetch(
          `https://en-touto-nika.firebaseio.com//usersNames/${userId}.json?auth=${token}`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error(
            "Δυστυχώς η διαγραφή του προγηγούμενου ονόματος χρήστη δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
          );
        }
      }

      // Save the userName to a user specific database
      const saveImageUrlResponse = await fetch(
        `https://en-touto-nika.firebaseio.com//usersNames/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName }),
        }
      );

      if (!saveImageUrlResponse.ok) {
        throw new Error(
          "Δυστυχώς η αποθήκευση του ονόματος χρήστη δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }

      // Get the userName on the screen.
      await dispatch(fetchUserName());
      const oldUserName = await localStorage.getItem(asyncNames.userName);
      if (!!oldUserName) {
        await localStorage.removeItem(asyncNames.userName);
      }
      await localStorage.setItem(asyncNames.userName, userName);
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserName = () => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      const response = await fetch(
        `https://en-touto-nika.firebaseio.com//usersNames/${userId}.json`
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η εύρεση του ονόματος χρήστη δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const resData = await response.json();

      let userName = "";
      for (const key in resData) {
        userName = resData[key].userName;
      }

      const oldUserName = await localStorage.getItem(asyncNames.userName);
      if (!!oldUserName) {
        await localStorage.removeItem(asyncNames.userName);
      }
      await localStorage.setItem(asyncNames.userName, JSON.stringify(userName));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAllUsersNames = () => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(
        `https://en-touto-nika.firebaseio.com//usersNames.json`
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η εύρεση του ονόματος χρήστη δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const resData = await response.json();

      // console.log('fetchAllUsersProfilePictureUrls ', resData);

      dispatch({
        type: USERS_NAMES,
        usersNames: resData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveImage = (img: any, prevImg: any) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;

      // First check if there is already an imageUrl in Database saved.
      // Delete the old one and post the new one.
      const fetchResponse = await fetch(
        `https://en-touto-nika.firebaseio.com//profilePictures/${userId}.json`
      );

      if (!fetchResponse.ok) {
        throw new Error(
          "Δυστυχώς η εύρεση του συνδέσμου της φωτογραφίας (imageUrl) δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const fetchResponseResData = await fetchResponse.json();

      if (!!fetchResponseResData) {
        const deleteResponse = await fetch(
          `https://en-touto-nika.firebaseio.com//profilePictures/${userId}.json?auth=${token}`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error(
            "Δυστυχώς η διαγραφή της προηγούμενης εικόνας προφίλ δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
          );
        }
      }

      // if (!!prevImg) {
      //   await firebase.deletePreviousImage(prevImg, userId);
      // }

      // let imageUrl = null;
      // if (!!img) {
      //   imageUrl = await firebase.storeImage(img, userId);
      // }

      // Save the imageUrl to a user specific database
      const saveImageUrlResponse = await fetch(
        `https://en-touto-nika.firebaseio.com//profilePictures/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: img.uri,
          }),
        }
      );

      if (!saveImageUrlResponse.ok) {
        throw new Error(
          "Δυστυχώς η αποθήκευση του συνδέσμου της φωτογραφίας (imageUrl) δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }

      // Get the image on the screen.
      await dispatch(fetchUserProfilePictureUrl());
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserProfilePictureUrl = () => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      const response = await fetch(
        `https://en-touto-nika.firebaseio.com//profilePictures/${userId}.json`
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η εύρεση του συνδέσμου της φωτογραφίας (imageUrl) δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const resData = await response.json();

      let imageUrl = "";
      for (const key in resData) {
        imageUrl = resData[key].imageUrl;
      }

      dispatch({
        type: USER_PROFILE_PICTURE_URL,
        userProfilePictureUrl: imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAllUsersProfilePictureUrls = () => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(
        `https://en-touto-nika.firebaseio.com//profilePictures.json`
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η εύρεση του συνδέσμου της φωτογραφίας (imageUrl) δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const resData = await response.json();

      // console.log('fetchAllUsersProfilePictureUrls ', resData);

      dispatch({
        type: USERS_PROFILE_PICTURE_URLS,
        usersProfilePictureUrls: resData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

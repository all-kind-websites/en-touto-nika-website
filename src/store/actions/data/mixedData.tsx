import strings from "../../../constants/strings";
import cache from "../../../utils/cache";

export const FETCH_All_USERS_DATA = "FETCH_All_USERS_DATA";

export const saveDataToAllUsersData = (email: string, totalPoints: number) => {
  return async () => {
    try {
      const { token, userId } = await cache.get(strings.userData);
      const date = new Date();

      // Fist post the data
      const firstPostResponse = await fetch(
        `https://en-touto-nika.firebaseio.com//All_Users_Data/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            totalPoints,
            email,
            date: date.toISOString()
          })
        }
      );

      if (!firstPostResponse.ok) {
        alert(
          "Δυστυχώς η ανάκτηση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );

        throw new Error(
          "Δυστυχώς η ανάκτηση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );

      }

    } catch (err) {
      // send to custom analytics server
      alert(
        "Προκειμένου κατεβάσετε τα δεδομένα όλων των παικτών, θα πρέπει να είστε συνδεδεμένοι στο ίντερνετ. Παρακαλώ ελέγξτε την σύνδεσή σας."
      );
      throw err;
    }
  };
};

export const fetchAllUsersData = () => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(
        `https://en-touto-nika.firebaseio.com//All_Users_Data.json`
      );

      // check before unpack the response body
      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η φόρτωση των δεδομένων για όλους τους παίκτες δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }

      const resData = await response.json();

      dispatch({
        type: FETCH_All_USERS_DATA,
        allUsersData: resData
      });
    } catch (err) {
      // send to custom analytics server
      alert(
        "Προκειμένου κατεβάσετε τα δεδομένα όλων των παικτών, θα πρέπει να είστε συνδεδεμένοι στο ίντερνετ. Παρακαλώ ελέγξτε την σύνδεσή σας."
      );

      throw err;
    }
  };
};


export const saveData = (email: string, totalPoints: number) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      const date = new Date();
      console.log('====================================');
      console.log('token, userId', !!token, !!userId);
      console.log('====================================');
      // First get the old grade to check which one to save
      const response = await fetch(
        `https://en-touto-nika.firebaseio.com/All_Users_Data/${userId}.json`
      );

      // check before unpack the response body
      if (!response.ok) {
        alert(
          "Δυστυχώς η ανάκτηση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );

        // throw new Error(
        //   "Δυστυχώς η ανάκτηση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        // );

      }

      const resData = await response.json();
      // Just keep on adding the points to the old ones...
      let newTotalPoints = 0;
      if (!resData) newTotalPoints = totalPoints;
      else {
        for (const key in resData) {
          for (const item in resData[key]) {
            if (resData[key].totalPoints) {
              newTotalPoints = +resData[key].totalPoints + +totalPoints;
            } else {
              newTotalPoints = +totalPoints;
            }
          }
        }
      }
      if (resData) {
        const deleteAllUsersData = await fetch(
          `https://en-touto-nika.firebaseio.com/All_Users_Data/${userId}.json?auth=${token}`,
          {
            method: "DELETE",
          }
        );
        if (!deleteAllUsersData.ok) {
          alert(
            "Δυστυχώς η διαγραφή της βαθμολογίας δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
          );

          // throw new Error(
          //   "Δυστυχώς η διαγραφή της βαθμολογίας δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
          // );
        }
      }

      const firstPostResponse = await fetch(
        `https://en-touto-nika.firebaseio.com/All_Users_Data/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPoints: newTotalPoints,
            email,
            date: date.toISOString(),
          }),
        }
      );

      if (!firstPostResponse.ok) {
        alert(
          "Δυστυχώς η αποθήκευση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
        // throw new Error(
        //   "Δυστυχώς η αποθήκευση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        // );

      }
    } catch (err) {
      // send to custom analytics server
      // alert(
      //   "Δυστυχώς η αποθήκευση των δεδομένων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
      // );
      throw err;
    }
  };
};

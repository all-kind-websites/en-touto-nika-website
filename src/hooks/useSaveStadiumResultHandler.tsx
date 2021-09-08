import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import saveGradeToCache from "../utils/saveGradeToCache";
import * as dataActions from "../store/actions/data";
import {
  removeAsyncMultiMixed,
  removeAsyncTrueFalseMixed,
  multipleChoiceRemoveAsync,
  noTimerRemoveAsync,
  trueFalseRemoveAsync,
  noTimerTrueFalseRemoveAsync,
} from "../utils/removeAsync";
import { savePoints } from "../store/actions/game";
import strings from "../constants/strings";
import { history } from "../App";
import nav from "../constants/nav";
import tryLogin from "../utils/tryLogin";

const useSaveStadiumResultHandler = (
  totalPoints: number,
  email: string,
  userIsLogedIn: boolean,
  gameType: string,
  timer: boolean,
  quit: Function,
  categoryId: string,
) => {
  const dispatch = useDispatch();
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [error, setError] = useState(); // error initially is undefined!

  const onLine = navigator.onLine;

  useEffect(() => {
    // tryLogin checks if users token is valid
    // and if not it gets a new one
    tryLogin(setError);
  }, []);

  if (error) {
    alert(`
    Σφάλμα στη διαδικασία ταυτοποίησης των στοιχείων σας.
    Παρακαλούμε ελέγξτε τη σύνδεσή σας.
    `)
  }

  const saveStadiumResult = async () => {
    setIsUpLoading(true);
    if (userIsLogedIn) {
      if (onLine) {
        await dispatch(dataActions.saveData(email, totalPoints));
      } else {
        alert("Η βαθμολογία σας θα αποθηκευθεί στη συσκευή σας και όταν θα συνδεθείτε θα αποθηκευθεί και στη βάση δεδομένων του παιχνιδιού.");
        //TODO: save points to redux
        saveGradeToCache(totalPoints);
      }
    }
    quit();
    setIsUpLoading(false);

    dispatch(savePoints(0, strings.pointsTypeMultiMixed))

    if (categoryId === "MultiMixed") {
      await removeAsyncMultiMixed();
    } else if (categoryId === "TrueFalseMixed") {
      await removeAsyncTrueFalseMixed();
    } else if (gameType === "Multi" && timer) {
      multipleChoiceRemoveAsync(categoryId);
    } else if (gameType === "Multi" && !timer) {
      noTimerRemoveAsync(categoryId);
    } else if (gameType === "TrueFalse" && timer) {
      trueFalseRemoveAsync(categoryId);
    } else if (gameType === "TrueFalse" && !timer) {
      noTimerTrueFalseRemoveAsync(categoryId);
    }
    history.push(nav.home);

  };

  return { isUpLoading, saveStadiumResult };
};
export default useSaveStadiumResultHandler;
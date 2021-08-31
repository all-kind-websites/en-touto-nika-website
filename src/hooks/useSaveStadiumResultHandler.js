import { useState } from "react";
import { Alert } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
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
} from "../utils/removeAsync.js";

export default useSaveStadiumResultHandler = (
  totalPoints,
  email,
  userIsLogedIn,
  gameType,
  withTimer,
  quit,
  categoryId
) => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [isUpLoading, setIsUpLoading] = useState(false);

  const saveStadiumResult = async () => {
    setIsUpLoading(true);
    if (userIsLogedIn) {
      if (netInfo.isInternetReachable) {
        await dispatch(dataActions.saveData(email, totalPoints));
      } else {
        Alert.alert(
          "Δεν υπάρχει σύνδεση!",
          "Η βαθμολογία σας θα αποθηκευθεί στη συσκευή σας και όταν θα συνδεθείτε θα αποθηκευθεί και στη βάση δεδομένων του παιχνιδιού.",
          [
            {
              text: "Εντάξει",
              onPress: async () => {
                saveGradeToCache(totalPoints);
              },
            },
          ]
        );
      }
    }
    quit();
    setIsUpLoading(false);

    if (categoryId === "MultiMixed") {
      await removeAsyncMultiMixed();
    } else if (categoryId === "TrueFalseMixed") {
      await removeAsyncTrueFalseMixed();
    } else if (gameType === "Multi" && withTimer) {
      multipleChoiceRemoveAsync();
    } else if (gameType === "Multi" && !withTimer) {
      noTimerRemoveAsync();
    } else if (gameType === "TrueFalse" && withTimer) {
      trueFalseRemoveAsync();
    } else if (gameType === "TrueFalse" && !withTimer) {
      noTimerTrueFalseRemoveAsync();
    }
  };

  return { isUpLoading, saveStadiumResult };
};

import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import NetInfo from "@react-native-community/netinfo";
import asynNames from "../constants/asyncNames/asyncNames";
import * as dataActions from "../store/actions/data";

export default getPointsOnConnection = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const [isConnected, setIsConnected] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });
    return () => unsub();
  }, [setIsConnected]);

  const getPoints = async () => {
    const points = await AsyncStorage.getItem(asynNames.savedPoints);
    if (!!points) {
      // Give it some time to get the email,
      // because saveData needs them.
      setShowNotification(true);

      setTimeout(async () => {
        console.log("points", points);
        await dispatch(dataActions.saveData(email, points));
        await AsyncStorage.removeItem(asynNames.savedPoints);
        setShowNotification(false);
      }, 2000);
    }
  };

  return { isConnected, showNotification, getPoints };
};

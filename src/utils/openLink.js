import React from "react";
import { Alert, Linking } from "react-native";

export default openLink = (link) => {
  Linking.openURL(link)
    .then((supported) => {
      if (!supported) {
        console.log("Cant handle url");
      } else {
        return Linking.openURL(link);
      }
    })
    .catch((err) => {
      console.error("An error occurred", err);
      Alert.alert("Σφάλμα στη διαδικασία ανοίγματος του συνδέσμου! ", [
        { text: "Εντάξει", style: "default" },
      ]);
    });
};

import { useEffect, useState } from "react";
import { Animated } from "react-native";

import Colours from "../constants/Colours";

const useTimeBarAnimation = () => {
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [timerAnimation] = useState(new Animated.Value(0));
  const [timerOpacity] = useState(new Animated.Value(1));

  // Timer animation
  const timerBarHandler = () => {
    timerAnimation.setValue(0);
    timerOpacity.setValue(1);

    Animated.timing(timerAnimation, {
      duration: milliSeconds,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    timerBarHandler();
  }, [milliSeconds]);

  const progressInterpolate = timerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const colorInterpolate = timerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colours.gr_brown_light, Colours.gr_brown_lighter],
  });

  const progressStyle = {
    width: progressInterpolate,
    bottom: 0,
    opacity: timerOpacity,
    backgroundColor: colorInterpolate,
  };
  return { progressStyle, setMilliSeconds, timerAnimation, timerOpacity };
};

export default useTimeBarAnimation;

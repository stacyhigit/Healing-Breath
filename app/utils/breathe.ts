import { Easing } from "react-native-reanimated";

export const formatTime = (secs: number) => {
  "worklet";
  const seconds = Math.floor(secs % 60);
  const minutes = Math.floor((secs / 60) % 60);

  return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
};

export const circleTiming = (secs: number) => {
  "worklet";
  return {
    duration: secs * 1000,
    easing: Easing.bezier(0.5, 0, 0.5, 1),
  };
};

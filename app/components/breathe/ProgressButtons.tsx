import { GestureResponderEvent, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "app/utils/constants";

interface ProgressButtonsProps {
  handleReset: (event: GestureResponderEvent) => void;
  handlePlayPause: (event: GestureResponderEvent) => void;
  paused: SharedValue<boolean>;
}

export default function ProgressButtons({
  handleReset,
  handlePlayPause,
  paused,
}: ProgressButtonsProps) {
  const animatedStylePause = useAnimatedStyle(() => ({
    opacity: paused.value ? withTiming(0) : withTiming(1),
  }));

  return (
    <>
      <Animated.View style={styles.replayButtonContainer}>
        <MaterialIcons
          name="replay"
          size={40}
          color={colors.secondary500}
          onPress={handleReset}
        />
      </Animated.View>
      <Animated.View style={styles.startPauseButtonContainer}>
        <MaterialIcons
          name="play-circle-filled"
          size={40}
          color="black"
          style={styles.button}
          onPress={handlePlayPause}
        />
      </Animated.View>
      <Animated.View
        style={[styles.startPauseButtonContainer, animatedStylePause]}
      >
        <MaterialIcons
          name="pause-circle-filled"
          size={40}
          color="black"
          style={styles.button}
          onPress={handlePlayPause}
        />
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  startPauseButtonContainer: {
    position: "absolute",
  },
  replayButtonContainer: {
    marginLeft: 160,
  },
  button: {
    borderRadius: 40,
    width: 40,
    height: 40,
    backgroundColor: colors.secondary500,
    borderColor: colors.secondary500,
    borderWidth: 2,
  },
});

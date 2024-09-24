import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { formatTime } from "app/utils/breathe";
import { colors } from "app/utils/constants";

interface ProgressBarProps {
  totalTimeSeconds: number;
  progressSeconds: SharedValue<number>;
  progressText: SharedValue<string>;
  width: number;
}

export default function ProgressBar({
  totalTimeSeconds,
  progressSeconds,
  width,
  progressText,
}: ProgressBarProps) {
  const progressBarWidth = width - 100;

  const progressBarTranslateX = useDerivedValue(() => {
    return interpolate(
      progressSeconds.value,
      [0, totalTimeSeconds],
      [progressBarWidth * -1, 0]
    );
  });

  const ProgressBarAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progressBarTranslateX.value }],
    };
  });

  return (
    <View style={[styles.progressBarContainer, { width: progressBarWidth }]}>
      <View style={styles.progressBarOuter}>
        <Animated.View
          style={[styles.progressBarInner, ProgressBarAnimationStyle]}
        />
      </View>
      <View style={styles.progressTextContainer}>
        <ReText style={styles.progressBarText} text={progressText} />
        <Text style={styles.progressBarText}>
          {formatTime(totalTimeSeconds)}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  progressBarContainer: {
    position: "absolute",
    bottom: 50,
    height: 40,
    maxWidth: 400,
  },
  progressBarOuter: {
    backgroundColor: colors.secondary600,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarInner: {
    width: "100%",
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressBarText: {
    color: "white",
    fontSize: 12,
    marginHorizontal: 8,
  },
  progressTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

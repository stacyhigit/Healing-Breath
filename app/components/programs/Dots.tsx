import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { colors } from "app/utils/constants";

interface DotsProps {
  index: number;
  activeIndex: number;
}

export default function Dots({ activeIndex, index }: DotsProps) {
  const inputRange = [index - 1, index, index + 1];

  const animatedStyle = useAnimatedStyle(() => {
    const scaleAnimation = interpolate(
      activeIndex,
      inputRange,
      [1, 1.4, 1],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      activeIndex,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      opacity: opacityAnimation,
      transform: [{ scale: scaleAnimation }],
    };
  });

  return <Animated.View style={[styles.dots, animatedStyle]}></Animated.View>;
}
const styles = StyleSheet.create({
  dots: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 7,
  },
});

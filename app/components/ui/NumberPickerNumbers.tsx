import { memo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { colors } from "app/utils/constants";

interface NumberPickerNumbersProps {
  translateX: SharedValue<number>;
  item: number;
  index: number;
  itemWidth: number;
  selectedNumber: number | undefined;
}

function NumberPickerNumbers({
  translateX,
  item,
  index,
  itemWidth,
  selectedNumber,
}: NumberPickerNumbersProps) {
  const inputRange = [
    (index - 3) * itemWidth,
    index * itemWidth,
    (index + 3) * itemWidth,
  ];

  const animatedContainerStyle = useAnimatedStyle(() => {
    const val = interpolate(
      translateX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP
    );
    const rotateVal = interpolate(
      translateX.value,
      inputRange,
      [80, 0, 80],
      Extrapolation.CLAMP
    );
    return {
      opacity: val,
      transform: [
        { translateY: -1.5 },
        { scale: val },
        { rotateY: `${rotateVal}deg` },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: item === selectedNumber ? colors.primary : "white",
  }));

  return (
    <Animated.View
      style={[{ width: itemWidth }, styles.container, animatedContainerStyle]}
    >
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        {item}
      </Animated.Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontFamily: "Amaranth_400Regular",
    color: "white",
  },
});

export default memo(NumberPickerNumbers);

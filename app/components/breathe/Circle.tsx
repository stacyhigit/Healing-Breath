import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { mix, polar2Canvas } from "react-native-redash";

import { colors } from "app/utils/constants";

interface CircleProps {
  index: number;
  progress: SharedValue<number>;
  width: number;
}

export default function Circle({ index, progress, width }: CircleProps) {
  const radius = (width - 30) / 4;

  const style = useAnimatedStyle(() => {
    const theta = (index * Math.PI) / 3;
    const { x, y } = polar2Canvas({ theta, radius }, { x: 0, y: 0 });
    const translateX = mix(progress.value, 0, x);
    const translateY = mix(progress.value, 0, y);
    const scale = mix(progress.value, 0.6, 1);
    return { transform: [{ translateX }, { translateY }, { scale }] };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <View
        style={[
          styles.circle,
          { width: 2 * radius, height: 2 * radius, borderRadius: radius },
        ]}
      />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: colors.primary,
    opacity: 0.6,
  },
});

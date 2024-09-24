import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

interface PhaseTextProps {
  phaseScale: SharedValue<number>;
  phaseText: SharedValue<string>;
}

export default function PhaseText({ phaseScale, phaseText }: PhaseTextProps) {
  const animatedStylePhase = useAnimatedStyle(() => ({
    opacity: phaseScale.value,
    transform: [{ scale: phaseScale.value }],
  }));

  return (
    <Animated.View style={[styles.inhaleExhaleContainer, animatedStylePhase]}>
      <ReText style={styles.inhaleExhaleText} text={phaseText} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inhaleExhaleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  inhaleExhaleText: {
    color: "black",
    fontSize: 24,
    fontFamily: "Amaranth_400Regular",
  },
});

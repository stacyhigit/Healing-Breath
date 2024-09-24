import { StyleSheet, View } from "react-native";

import TimeCircle from "./TimeCircle";

interface timeCirclesProps {
  inhaleSeconds: number;
  inhaleHoldSeconds: number;
  exhaleSeconds: number;
  exhaleHoldSeconds: number;
  bpm?: number;
}

export default function TimeCircles({
  inhaleSeconds,
  inhaleHoldSeconds,
  exhaleSeconds,
  exhaleHoldSeconds,
  bpm,
}: timeCirclesProps) {
  return (
    <View style={styles.circleContainer}>
      {bpm ? (
        <TimeCircle circleText={inhaleSeconds} label="breaths per minute" />
      ) : (
        <>
          <TimeCircle circleText={inhaleSeconds} label="inhale" />
          {inhaleHoldSeconds > 0 && (
            <TimeCircle circleText={inhaleHoldSeconds} label="hold" />
          )}
          <TimeCircle circleText={exhaleSeconds} label="exhale" />
          {exhaleHoldSeconds > 0 && (
            <TimeCircle circleText={exhaleHoldSeconds} label="hold" />
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 6,
  },
});

import { StyleSheet, Text } from "react-native";

export function PageOne() {
  return (
    <>
      <Text style={styles.instructionText}>
        Find a comfortable position sitting upright in a chair or lyingon your
        back with knees bent
      </Text>
      <Text style={[styles.instructionText, styles.textP2]}>
        Close your eyes, or soften your gaze if closing your eyes is
        uncomfortable
      </Text>
    </>
  );
}

export function PageTwo() {
  return (
    <>
      <Text style={styles.instructionText}>
        Breathe through your nose, and focus your attention on the breath at the
        nostrils or wherever it’s clearest to you
      </Text>
      <Text style={[styles.instructionText, styles.textP2]}>
        When your mind wanders gently bring your attention back to your breath
      </Text>
    </>
  );
}

export function PageThree() {
  return (
    <>
      <Text style={styles.instructionText}>
        Breathe slowly, gently, and comfortably, without forcing in any way
      </Text>
      <Text style={[styles.instructionText, styles.textP2]}>
        Notice how your body relaxes when you breathe out.
      </Text>
      <Text style={[styles.instructionText, styles.textP2]}>
        Notice in your body the increase in energy when you breathe in
      </Text>
    </>
  );
}
const styles = StyleSheet.create({
  instructionText: {
    color: "white",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  textP2: {
    marginTop: 18,
  },
});

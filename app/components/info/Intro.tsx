import { StyleSheet, Text } from "react-native";
export default function Intro() {
  return (
    <>
      <Text style={styles.text}>
        {'"'}Studies are revealing that by changing the patterns of breathing it
        is possible to restore balance to stress response systems, calm an
        agitated mind, relieve symptoms of anxiety and post-traumatic stress
        disorder (PTSD), improve physical health and endurance, elevate
        performance, and enhance relationships.
        {'"'}
      </Text>
      <Text style={[styles.text, styles.textP2]}>Richard P. Brown, MD</Text>
      <Text style={styles.text}>Patricia L. Gerbarg, MD</Text>
      <Text style={[styles.text, styles.title]}>
        The Healing Power of the Breath
      </Text>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  title: {
    fontFamily: "OpenSans_400Regular_Italic",
  },
  textP2: {
    marginTop: 18,
  },
});

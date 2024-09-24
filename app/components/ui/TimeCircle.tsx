import { StyleSheet, Text, View } from "react-native";

import { colors } from "app/utils/constants";

interface TimeCircleProps {
  circleText: number;
  label: string;
}

export default function TimeCircle({ circleText, label }: TimeCircleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.text}>{circleText}</Text>
      </View>
      <Text style={styles.textLabel}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  circle: {
    width: 48,
    height: 48,
    justifyContent: "center",
    backgroundColor: colors.secondary800,
    borderRadius: 25,
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Amaranth_400Regular",
    marginBottom: 5,
  },
  textLabel: {
    color: "white",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "OpenSans_400Regular",
  },
});

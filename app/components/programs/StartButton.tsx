import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors } from "../../utils/constants";

interface StartButtonProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export default function StartButton({
  label = "Start",
  style,
}: StartButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginBottom: 18,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Amaranth_400Regular",
  },
});

import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { colors } from "app/utils/constants";

interface HeaderTextProps {
  header: string;
  style?: StyleProp<TextStyle>;
}

export default function HeadingText({ header, style }: HeaderTextProps) {
  return <Text style={[styles.header, style]}>{header}</Text>;
}
const styles = StyleSheet.create({
  header: {
    fontFamily: "Amaranth_400Regular",
    fontSize: 24,
    marginBottom: 18,
    color: colors.primary,
  },
});

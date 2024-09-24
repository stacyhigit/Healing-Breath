import { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, StyleProp } from "react-native";

interface TextComponentProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}
export default function TextComponent({ children, style }: TextComponentProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "OpenSans_400Regular",
    marginBottom: 12,
  },
});

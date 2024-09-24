import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface DotsContainerProps {
  children: ReactNode;
}

export default function DotsContainer({ children }: DotsContainerProps) {
  return <View style={styles.dotsContainer}>{children}</View>;
}
const styles = StyleSheet.create({
  dotsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});

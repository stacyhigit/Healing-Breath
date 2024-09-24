import { StyleSheet, View } from "react-native";

import GoBackArrow from "../ui/GoBackArrow";

export default function InfoHeader() {
  return (
    <View style={styles.icon}>
      <GoBackArrow />
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 16,
    left: 24,
  },
});

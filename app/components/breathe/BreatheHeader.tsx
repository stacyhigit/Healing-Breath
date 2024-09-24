import { StyleSheet, View } from "react-native";

import GoBackArrow from "../ui/GoBackArrow";
import GoToSounds from "../ui/GoToSounds";

export default function BreatheHeader() {
  return (
    <>
      <View style={styles.goBack}>
        <GoBackArrow />
      </View>
      <View style={styles.sounds}>
        <GoToSounds />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: 16,
    left: 24,
  },
  sounds: {
    position: "absolute",
    top: 16,
    right: 24,
  },
});

import { StyleSheet, View } from "react-native";

import GoToSounds from "../ui/GoToSounds";
import ShowInstrutions from "../ui/ShowInstructions";

export default function ProgramsHeader() {
  return (
    <>
      <View style={styles.goToSounds}>
        <GoToSounds />
      </View>
      <View style={styles.showInstrutions}>
        <ShowInstrutions />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  goToSounds: {
    position: "absolute",
    top: 16,
    right: 24,
  },
  showInstrutions: {
    position: "absolute",
    top: 18,
    right: 64,
  },
});

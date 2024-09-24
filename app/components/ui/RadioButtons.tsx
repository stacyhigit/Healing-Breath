import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { colors } from "app/utils/constants";

interface RadioButtonsProps {
  isChecked: boolean;
}

export default function RadioButtons({ isChecked }: RadioButtonsProps) {
  return (
    <>
      {!isChecked && (
        <MaterialIcons
          name="radio-button-unchecked"
          size={20}
          color={colors.white30percent}
          containerStyle={styles.icon}
        />
      )}
      {isChecked && (
        <MaterialIcons
          name="radio-button-checked"
          size={20}
          color={colors.primary}
          containerStyle={styles.icon}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

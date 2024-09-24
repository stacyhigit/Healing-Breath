import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "app/utils/constants";

interface CheckBoxProps {
  isChecked: boolean;
}

export default function CheckBox({ isChecked }: CheckBoxProps) {
  return (
    <>
      {!isChecked && (
        <MaterialIcons
          name="check-box-outline-blank"
          size={20}
          color={colors.white87percent}
          containerStyle={styles.icon}
        />
      )}
      {isChecked && (
        <MaterialIcons
          name="check-box"
          size={20}
          color={colors.white87percent}
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

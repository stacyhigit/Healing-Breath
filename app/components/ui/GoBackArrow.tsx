import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { StackNavigation } from "app/Navigation";
import { colors } from "app/utils/constants";

import PressableComponent from "./PressableComponent";

export default function GoBackArrow() {
  const navigation = useNavigation<StackNavigation>();

  return (
    <PressableComponent
      style={{}}
      onPress={() => {
        navigation.goBack();
      }}
      disabled={false}
    >
      <MaterialIcons
        name="keyboard-backspace"
        size={32}
        color={colors.white87percent}
      />
    </PressableComponent>
  );
}

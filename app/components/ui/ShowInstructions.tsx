import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { StackNavigation } from "app/Navigation";
import { colors } from "app/utils/constants";

import PressableComponent from "./PressableComponent";

export default function ShowInstrutions() {
  const navigation = useNavigation<StackNavigation>();

  return (
    <PressableComponent
      style={{}}
      onPress={() => {
        navigation.navigate("Instructions");
      }}
    >
      <MaterialIcons
        name="info-outline"
        size={28}
        color={colors.white87percent}
      />
    </PressableComponent>
  );
}

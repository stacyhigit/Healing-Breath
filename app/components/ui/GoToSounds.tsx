import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import { StackNavigation } from "app/Navigation";
import { colors } from "app/utils/constants";
import { useAppSelector } from "app/store/store";

import PressableComponent from "../ui/PressableComponent";

export default function GoToSounds() {
  const playSounds = useAppSelector((state) => state.sounds.playSounds);

  const navigation = useNavigation<StackNavigation>();

  return (
    <>
      {playSounds ? (
        <PressableComponent
          onPress={() => navigation.navigate("Sounds")}
          disabled={false}
        >
          <MaterialIcons
            name="volume-up"
            size={32}
            color={colors.secondary200}
          />
        </PressableComponent>
      ) : (
        <PressableComponent
          onPress={() => navigation.navigate("Sounds")}
          disabled={false}
        >
          <MaterialIcons
            name="volume-off"
            size={32}
            color={colors.secondary400}
          />
        </PressableComponent>
      )}
    </>
  );
}

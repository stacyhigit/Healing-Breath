import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { StackNavigation } from "app/Navigation";
import { useAppSelector } from "app/store/store";
import { inhaleExhaleNumbers, holdNumbers, colors } from "app/utils/constants";

import TimeCircles from "app/components/ui/TimeCircles";
import PressableComponent from "app/components/ui/PressableComponent";
import OptionsContainer from "../OptionsContainer";
import NavigateButton from "../NavigateButton";

interface customOptionsProps {
  pageWidth: number;
}

export default function CustomOptions({ pageWidth }: customOptionsProps) {
  const navigation = useNavigation<StackNavigation>();

  const customConfig = useAppSelector((state) => state.programs.custom);

  const inhaleSeconds = inhaleExhaleNumbers[customConfig.inhaleSecondsIndex];
  const inhaleHoldSeconds = holdNumbers[customConfig.inhaleHoldSecondsIndex];
  const exhaleSeconds = inhaleExhaleNumbers[customConfig.exhaleSecondsIndex];
  const exhaleHoldSeconds = holdNumbers[customConfig.exhaleHoldSecondsIndex];

  const navigationProps = {
    inhaleSeconds,
    inhaleHoldSeconds,
    exhaleSeconds,
    exhaleHoldSeconds,
  };

  const handleSettings = () => {
    navigation.navigate("Options");
  };

  return (
    <OptionsContainer pageWidth={pageWidth}>
      <NavigateButton navigationProps={navigationProps} />
      <TimeCircles
        inhaleSeconds={inhaleSeconds}
        inhaleHoldSeconds={inhaleHoldSeconds}
        exhaleSeconds={exhaleSeconds}
        exhaleHoldSeconds={exhaleHoldSeconds}
      />
      <PressableComponent
        style={styles.options}
        onPress={handleSettings}
        disabled={false}
      >
        <MaterialIcons
          name="settings"
          size={24}
          color={colors.white87percent}
        />
      </PressableComponent>
    </OptionsContainer>
  );
}
const styles = StyleSheet.create({
  options: {
    position: "absolute",
    right: 0,
    top: 68,
    alignItems: "flex-end",
  },
});

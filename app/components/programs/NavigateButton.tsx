import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BreatheProps, StackNavigation } from "app/Navigation";
import { colors } from "app/utils/constants";

import PressableComponent from "../ui/PressableComponent";

interface NavigateButtonProps {
  label?: string;
  navigationProps: BreatheProps;
}

export default function NavigateButton({
  label = "Start",
  navigationProps,
}: NavigateButtonProps) {
  const navigation = useNavigation<StackNavigation>();

  const handlePress = () => {
    navigation.navigate("Breathe", navigationProps);
  };

  return (
    <PressableComponent onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </PressableComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginBottom: 18,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Amaranth_400Regular",
  },
});

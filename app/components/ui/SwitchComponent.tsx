import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Switch } from "react-native";

import { colors } from "../../utils/constants";

interface SwitchComponentProps {
  isEnabled: boolean;
  toggleSwitch: Dispatch<SetStateAction<boolean>>;
}

export default function SwitchComponent({
  isEnabled,
  toggleSwitch,
}: SwitchComponentProps) {
  return (
    <Switch
      style={styles.switch}
      trackColor={{
        false: colors.white30percent,
        true: colors.primary50percent,
      }}
      thumbColor={isEnabled ? colors.primary : colors.secondary400}
      ios_backgroundColor={colors.primary50percent}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { StackNavigation } from "app/Navigation";
import { colors } from "app/utils/constants";
import { SoundSettings } from "app/utils/sounds";
import { useAppSelector } from "app/store/store";

import PressableComponent from "../ui/PressableComponent";

interface SoundItemProps {
  soundSettingLabel: string;
  soundName: string;
  soundSetting: keyof SoundSettings;
  isLast?: boolean;
}

export default function SoundItem({
  soundSettingLabel,
  soundName,
  soundSetting,
  isLast,
}: SoundItemProps) {
  const navigation = useNavigation<StackNavigation>();

  const sounds = useAppSelector((state) => state.sounds);

  return (
    <PressableComponent
      style={[styles.rowContainer, isLast && styles.last]}
      onPress={() => {
        navigation.navigate("Select Sound", {
          soundSetting: soundSetting,
          label: soundSettingLabel,
        });
      }}
      disabled={!sounds.playSounds}
    >
      <Text style={styles.text}>{soundSettingLabel}</Text>
      <View style={styles.bellContainer}>
        {soundName === "none" ? (
          <MaterialIcons
            name="notifications-off"
            size={24}
            color={colors.white87percent}
          />
        ) : (
          <>
            <Text style={styles.textBell}>{soundName}</Text>
            <MaterialIcons
              name="notifications"
              size={24}
              color={colors.primary}
            />
          </>
        )}
      </View>
    </PressableComponent>
  );
}
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomColor: colors.white12percent,
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 10,
  },
  last: {
    borderBottomColor: "transparent",
  },
  bellContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  text: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
    color: "white",
  },
  textBell: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
    color: colors.primary,
  },
});

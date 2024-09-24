import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";

import { RootStackParamList } from "app/Navigation";
import { colors } from "app/utils/constants";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { togglePlaySounds } from "app/store/features/soundSlice";

import HeadingText from "app/components/sounds/HeadingText";
import SwitchComponent from "app/components/ui/SwitchComponent";
import SoundItem from "app/components/sounds/SoundItem";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "Sounds">;

export default function Sounds({ navigation }: SettingsProps) {
  const sounds = useAppSelector((state) => state.sounds);
  const dispatch = useAppDispatch();

  const toggleSwitch = () => {
    dispatch(togglePlaySounds());
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <HeadingText
            header={sounds.playSounds ? "On" : "Off"}
            style={sounds.playSounds ? styles.headerOn : styles.headerOff}
          />
          <SwitchComponent
            isEnabled={sounds.playSounds}
            toggleSwitch={toggleSwitch}
          />
        </View>
        <View
          style={
            sounds.playSounds
              ? styles.listContainer
              : styles.listContainerDisabled
          }
        >
          <SoundItem
            soundSettingLabel="inhale"
            soundName={sounds.soundSettings.inhaleSound.name}
            soundSetting="inhaleSound"
          />

          <SoundItem
            soundSettingLabel="inhale hold"
            soundName={sounds.soundSettings.inhaleHoldSound.name}
            soundSetting="inhaleHoldSound"
          />

          <SoundItem
            soundSettingLabel="exhale"
            soundName={sounds.soundSettings.exhaleSound.name}
            soundSetting="exhaleSound"
          />

          <SoundItem
            soundSettingLabel="exhale hold"
            soundName={sounds.soundSettings.exhaleHoldSound.name}
            soundSetting="exhaleHoldSound"
            isLast={true}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 30,
  },
  listContainer: {
    backgroundColor: colors.white05percent,
    borderRadius: 10,
  },
  listContainerDisabled: {
    backgroundColor: "white",
    opacity: 0.2,
    borderRadius: 10,
  },
  headerOn: {
    color: colors.primary,
  },
  headerOff: {
    color: colors.primary60percent,
  },
});

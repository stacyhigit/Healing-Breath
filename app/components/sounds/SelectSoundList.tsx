import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppDispatch, useAppSelector } from "app/store/store";
import { changeSoundSetting } from "app/store/features/soundSlice";
import { playSound, SOUNDS, Sound, SoundSettings } from "app/utils/sounds";
import { colors } from "app/utils/constants";

import RadioButtons from "../ui/RadioButtons";
import PressableComponent from "../ui/PressableComponent";

interface SoundListProps {
  soundSetting: keyof SoundSettings;
}

export default function SelectSoundList({ soundSetting }: SoundListProps) {
  const soundArray = Object.keys(SOUNDS) as (keyof typeof SOUNDS)[];

  const soundSettings = useAppSelector((state) => state.sounds.soundSettings);

  const dispatch = useAppDispatch();

  const handlePress = (soundSetting: keyof SoundSettings, sound: Sound) => {
    dispatch(changeSoundSetting({ soundSetting: soundSetting, sound }));
    playSound(sound);
  };

  return (
    <ScrollView style={styles.scrollView}>
      {soundArray.map((sound, index: number) => {
        const isChecked =
          SOUNDS[sound].name === soundSettings[soundSetting].name;

        const isLast = index + 1 === soundArray.length;
        return (
          <View
            key={index}
            style={[styles.soundContainer, isLast && styles.last]}
          >
            <PressableComponent
              style={styles.pressable}
              onPress={() => handlePress(soundSetting, SOUNDS[sound])}
              disabled={false}
            >
              <RadioButtons isChecked={isChecked} />
              <Text style={styles.text}>{SOUNDS[sound].name}</Text>
            </PressableComponent>
          </View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 30,
  },
  soundContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
    color: "white",
    marginLeft: 16,
  },
});

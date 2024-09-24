import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "app/Navigation";
import { colors } from "app/utils/constants";

import SelectSoundList from "app/components/sounds/SelectSoundList";
import HeadingText from "app/components/sounds/HeadingText";

type SelectSoundProps = NativeStackScreenProps<
  RootStackParamList,
  "Select Sound"
>;

export default function SelectSound({ route }: SelectSoundProps) {
  const { soundSetting, label } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeadingText header={`${label} sound`} />
      </View>
      <View style={styles.listContainer}>
        <SelectSoundList soundSetting={soundSetting} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 30,
  },
  headerContainer: {
    paddingHorizontal: 30,
  },
  listContainer: {
    backgroundColor: colors.white05percent,
    borderRadius: 20,
  },
});

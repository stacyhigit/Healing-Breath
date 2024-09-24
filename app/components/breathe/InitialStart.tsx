import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { durationNumbers } from "app/utils/constants";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { changeDuration } from "app/store/features/programsSlice";
import NumberPicker from "../ui/NumberPicker";

interface InitialStartProps {
  handleInitialStart: () => void;
}

export default function InitialStart({
  handleInitialStart,
}: InitialStartProps) {
  const durationIndex = useAppSelector((state) => state.programs.durationIndex);

  const dispatch = useAppDispatch();

  const setDuration = (index: number) => {
    dispatch(changeDuration({ index }));
  };

  return (
    <>
      <View style={styles.startButtonContainer}>
        <MaterialIcons
          name="play-arrow"
          size={70}
          color="black"
          onPress={handleInitialStart}
        />
      </View>
      <View style={styles.numberPickerContainer}>
        <Text style={styles.text}>
          {durationNumbers[durationIndex]} minutes
        </Text>
        <NumberPicker
          timerNumbers={durationNumbers}
          defaultIndex={durationIndex}
          selectedNumberIndex={durationIndex}
          setSelectedNumber={setDuration}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  numberPickerContainer: {
    position: "absolute",
    bottom: 76,
  },
  startButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  text: {
    color: "white",
    fontFamily: "OpenSans_400Regular",
    marginBottom: 12,
    textAlign: "center",
  },
});

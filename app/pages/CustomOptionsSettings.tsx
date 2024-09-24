import { StyleSheet, View } from "react-native";

import { useAppDispatch, useAppSelector } from "app/store/store";
import { changeCustomSecondsIndex } from "app/store/features/programsSlice";
import { inhaleExhaleNumbers, holdNumbers } from "app/utils/constants";
import { pickerWidth } from "app/components/ui/NumberPicker";

import NumberPickerContainer from "app/components/programs/NumberPickerContainer";

export default function CustomOptionsSettings() {
  const customConfig = useAppSelector((state) => state.programs.custom);

  const dispatch = useAppDispatch();

  const setInhaleSeconds = (index: number) => {
    dispatch(changeCustomSecondsIndex({ key: "inhaleSecondsIndex", index }));
  };

  const setInhaleHoldSeconds = (index: number) => {
    dispatch(
      changeCustomSecondsIndex({ key: "inhaleHoldSecondsIndex", index })
    );
  };

  const setExhaleSeconds = (index: number) => {
    dispatch(changeCustomSecondsIndex({ key: "exhaleSecondsIndex", index }));
  };

  const setExhaleHoldSeconds = (index: number) => {
    dispatch(
      changeCustomSecondsIndex({ key: "exhaleHoldSecondsIndex", index })
    );
  };

  return (
    <View style={styles.container}>
      <NumberPickerContainer
        selectedNumberIndex={customConfig.inhaleSecondsIndex}
        setSelectedNumber={setInhaleSeconds}
        timerNumbers={inhaleExhaleNumbers}
        timerText="Inhale count:"
        unitText="seconds"
        style={styles.breatheSeconds}
      />
      <NumberPickerContainer
        selectedNumberIndex={customConfig.inhaleHoldSecondsIndex}
        setSelectedNumber={setInhaleHoldSeconds}
        timerNumbers={holdNumbers}
        timerText="Hold count:"
        unitText="seconds"
        style={styles.breatheSeconds}
      />
      <NumberPickerContainer
        selectedNumberIndex={customConfig.exhaleSecondsIndex}
        setSelectedNumber={setExhaleSeconds}
        timerNumbers={inhaleExhaleNumbers}
        timerText="Exhale count:"
        unitText="seconds"
        style={styles.breatheSeconds}
      />
      <NumberPickerContainer
        selectedNumberIndex={customConfig.exhaleHoldSecondsIndex}
        setSelectedNumber={setExhaleHoldSeconds}
        timerNumbers={holdNumbers}
        timerText="Hold count:"
        unitText="seconds"
        style={styles.breatheSeconds}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: pickerWidth + 100,
    alignSelf: "center",
  },

  breatheSeconds: {
    marginTop: 22,
  },
});

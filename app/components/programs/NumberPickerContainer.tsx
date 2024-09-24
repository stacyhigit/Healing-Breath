import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import NumberPicker from "app/components/ui/NumberPicker";

interface NumberPickerContainerProps {
  selectedNumberIndex: number;
  setSelectedNumber: ((index: number) => void) | (() => void);
  timerNumbers: number[];
  timerText: string;
  unitText: string;
  footerText?: string;
  style?: StyleProp<ViewStyle>;
}

export default function NumberPickerContainer({
  selectedNumberIndex,
  setSelectedNumber,
  timerNumbers,
  timerText,
  unitText,
  footerText,
  style,
}: NumberPickerContainerProps) {
  return (
    <View style={[styles.numberPickerContainer, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {timerText} {timerNumbers[selectedNumberIndex]} {unitText}
        </Text>
      </View>
      <NumberPicker
        style={styles.numberPicker}
        timerNumbers={timerNumbers}
        defaultIndex={selectedNumberIndex}
        selectedNumberIndex={selectedNumberIndex}
        setSelectedNumber={setSelectedNumber}
      />
      {footerText && (
        <View style={[styles.textContainer, styles.footerContainer]}>
          <Text style={styles.text}>{footerText}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  numberPickerContainer: {
    marginTop: 6,
  },
  textContainer: {
    alignItems: "flex-start",
    marginLeft: 22,
  },
  footerContainer: {
    paddingTop: 6,
  },
  numberPicker: {
    marginTop: 12,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontFamily: "OpenSans_400Regular",
  },
});

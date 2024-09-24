import { useCallback } from "react";
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { colors, durationNumbers } from "app/utils/constants";

import NumberPickerNumbers from "./NumberPickerNumbers";

export const pickerWidth = 230;

interface NumberPickerProps {
  timerNumbers: typeof durationNumbers;
  defaultIndex: number;
  selectedNumberIndex: number;
  setSelectedNumber: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

export default function NumberPicker({
  timerNumbers,
  defaultIndex,
  selectedNumberIndex,
  setSelectedNumber,
  style,
}: NumberPickerProps) {
  const itemWidth = 40;
  const numberPadding = (pickerWidth - itemWidth) / 2;

  const translateX = useSharedValue(0);

  const keyExtractor = (item: number) => item?.toString();

  const renderItem: ListRenderItem<number> = useCallback(
    ({ item, index }) => {
      return (
        <NumberPickerNumbers
          translateX={translateX}
          item={item}
          index={index}
          itemWidth={itemWidth}
          selectedNumber={timerNumbers[selectedNumberIndex]}
        />
      );
    },
    [translateX, timerNumbers, selectedNumberIndex]
  );

  const getItemLayout = useCallback(
    (data: ArrayLike<number> | null | undefined, index: number) => ({
      length: itemWidth,
      offset: itemWidth * index,
      index,
    }),
    []
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    let selected = Math.round(ev.nativeEvent.contentOffset.x / itemWidth);
    selected =
      selected >= timerNumbers.length - 1 ? timerNumbers.length - 1 : selected;
    setSelectedNumber(selected);
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.FlatList
        data={timerNumbers}
        initialNumToRender={7}
        keyExtractor={keyExtractor}
        horizontal
        snapToInterval={itemWidth}
        decelerationRate={"fast"}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={{ paddingHorizontal: numberPadding }}
        initialScrollIndex={defaultIndex}
        onScroll={scrollHandler}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 32,
  },
  flatList: {
    width: pickerWidth,
    height: 32,
    backgroundColor: colors.secondary800,
    borderRadius: 4,
  },
});

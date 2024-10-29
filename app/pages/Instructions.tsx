import { useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";

import { PageOne, PageThree, PageTwo } from "app/components/info/Pages";
import InstructionsComponent from "app/components/info/InstructionsComponent";
import PressableComponent from "app/components/ui/PressableComponent";
import CheckBox from "app/components/ui/CheckBox";

import { useAppDispatch, useAppSelector } from "app/store/store";
import { toggleShowInstructions } from "app/store/features/programsSlice";

const { height, width } = Dimensions.get("window");
const maxWidth = 414;
const maxHeight = 600;
const pageWidth = width > maxWidth ? maxWidth : width;
const pageHeight = height > maxHeight ? maxHeight : height;
const innerWidth = pageWidth - 50;

export default function Instructions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pages = [
    { pageName: PageOne },
    { pageName: PageTwo },
    { pageName: PageThree },
  ];

  const showInstructions = useAppSelector(
    (state) => state.programs.showInstructions
  );

  const dispatch = useAppDispatch();
  const handletoggleShowInstructions = () => {
    dispatch(toggleShowInstructions());
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={true}
      />
      <View
        style={{
          height: pageHeight,
          width: pageWidth,
        }}
      >
        <View style={[{ width: innerWidth }, styles.innerContainer]}>
          <InstructionsComponent
            innerWidth={innerWidth}
            pages={pages}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <PressableComponent
            style={styles.showMessageContainer}
            onPress={handletoggleShowInstructions}
          >
            <CheckBox isChecked={showInstructions} />
            <Text style={styles.text}>Show on start</Text>
          </PressableComponent>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignSelf: "center",
    gap: 30,
    marginVertical: 20,
  },
  showMessageContainer: {
    flexDirection: "row",
    width: innerWidth,
    alignSelf: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  text: {
    fontFamily: "OpenSans_400Regular",
    color: "white",
  },
});

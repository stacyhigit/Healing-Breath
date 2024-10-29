import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";

import { StackNavigation } from "app/Navigation";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { toggleShowInstructions } from "app/store/features/programsSlice";
import StartButton from "../programs/StartButton";

import InstructionsComponent from "app/components/info/InstructionsComponent";
import PressableComponent from "../ui/PressableComponent";
import { PageOne, PageThree, PageTwo } from "app/components/info/Pages";

import CheckBox from "../ui/CheckBox";

const { height, width } = Dimensions.get("window");
const maxWidth = 414;
const maxHeight = 600;
const pageWidth = width > maxWidth ? maxWidth : width;
const pageHeight = height > maxHeight ? maxHeight : height;
const innerWidth = pageWidth - 50;

export default function StartInstructions() {
  const [activeIndex, setActiveIndex] = useState(0);

  const pages = [
    { pageName: PageOne },
    { pageName: PageTwo },
    { pageName: PageThree },
  ];

  const navigation = useNavigation<StackNavigation>();

  const showInstructions = useAppSelector(
    (state) => state.programs.showInstructions
  );

  const dispatch = useAppDispatch();
  const handletoggleShowInstructions = () => {
    dispatch(toggleShowInstructions());
  };

  return (
    <View style={[styles.container, { height: pageHeight, width: pageWidth }]}>
      <View
        style={[
          { width: innerWidth, height: pageHeight },
          styles.innerContainer,
        ]}
      >
        <InstructionsComponent
          innerWidth={innerWidth}
          pages={pages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <View style={styles.footerContainer}>
          <PressableComponent
            style={styles.showMessageContainer}
            onPress={handletoggleShowInstructions}
          >
            <CheckBox isChecked={!showInstructions} />
            <Text style={styles.text}>Don{"'"}t show again</Text>
          </PressableComponent>

          <PressableComponent
            style={{ width: innerWidth }}
            onPress={() => {
              navigation.dispatch(StackActions.replace("Programs"));
            }}
            disabled={false}
          >
            <StartButton
              label={
                Math.round(activeIndex) === pages.length - 1
                  ? "Start Breathing"
                  : "Skip"
              }
              style={styles.startButton}
            />
          </PressableComponent>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  innerContainer: {
    alignSelf: "center",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  showMessageContainer: {
    flexDirection: "row",
    width: innerWidth,
    alignSelf: "center",
    alignItems: "center",
    gap: 8,
  },
  footerContainer: {
    gap: 20,
    marginTop: 12,
  },
  text: {
    fontFamily: "OpenSans_400Regular",
    color: "white",
  },
  startButton: {
    marginBottom: 0,
  },
});

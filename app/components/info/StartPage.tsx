import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";

import { StackNavigation } from "app/Navigation";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { toggleShowInstructions } from "app/store/features/programsSlice";
import { colors } from "app/utils/constants";

import StartButton from "../programs/StartButton";
import PressableComponent from "../ui/PressableComponent";
import Dots from "../programs/Dots";
import CheckBox from "../ui/CheckBox";

import Intro from "./Intro";
import { PageOne, PageThree, PageTwo } from "./Pages";

const { height, width } = Dimensions.get("window");
const maxWidth = 414;
const maxHeight = 700;
const pageWidth = width > maxWidth ? maxWidth : width;
const pageHeight = height > maxHeight ? maxHeight : height;
const innerWidth = pageWidth - 50;

let isSmallScreen = false;
if (height < 736 || width < 411) {
  isSmallScreen = true;
}

export default function StartPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<StackNavigation>();

  const logo = require("assets/images/logoTransparent.png");

  const showInstructions = useAppSelector(
    (state) => state.programs.showInstructions
  );

  const dispatch = useAppDispatch();
  const handletoggleShowInstructions = () => {
    dispatch(toggleShowInstructions());
  };

  const pages = [
    { page: Intro },
    { page: PageOne },
    { page: PageTwo },
    { page: PageThree },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          height: pageHeight,
          width: pageWidth,
        },
      ]}
    >
      <View
        style={[
          { width: innerWidth, height: pageHeight },
          styles.innerContainer,
        ]}
      >
        <View style={styles.topContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.HeadingText}>How To Breathe</Text>
          <View>
            <ScrollView
              horizontal
              scrollEventThrottle={16}
              snapToInterval={innerWidth}
              decelerationRate={"fast"}
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                const scrollOffset = nativeEvent.contentOffset.x;
                const activeIndex = scrollOffset / innerWidth;
                setActiveIndex(activeIndex);
              }}
            >
              {pages.map((page, index) => (
                <View key={index} style={{ width: innerWidth }}>
                  <page.page />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.dotsContainer}>
            {new Array(pages.length).fill(0).map((_, index) => (
              <Dots key={index} index={index} activeIndex={activeIndex} />
            ))}
          </View>
        </View>
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
  topContainer: {
    gap: 20,
  },
  logo: {
    flex: 0,
    width: isSmallScreen ? 130 : 180,
    height: isSmallScreen ? 130 : 180,
    alignSelf: "center",
  },
  HeadingText: {
    fontFamily: "Amaranth_400Regular",
    fontSize: isSmallScreen ? 22 : 28,
    color: colors.primary,
    marginTop: 12,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
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

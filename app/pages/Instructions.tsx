import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "app/utils/constants";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { toggleShowInstructions } from "app/store/features/programsSlice";

import Dots from "app/components/programs/Dots";
import { PageOne, PageThree, PageTwo } from "app/components/info/Pages";
import PressableComponent from "app/components/ui/PressableComponent";
import CheckBox from "app/components/ui/CheckBox";

const { height, width } = Dimensions.get("window");
const maxWidth = 414;
const maxHeight = 600;
const pageWidth = width > maxWidth ? maxWidth : width;
const pageHeight = height > maxHeight ? maxHeight : height;
const innerWidth = pageWidth - 50;

export default function Instructions() {
  const [activeIndex, setActiveIndex] = useState(0);

  const logo = require("assets/images/logoTransparent.png");
  const pages = [{ page: PageOne }, { page: PageTwo }, { page: PageThree }];

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
  logo: {
    flex: 0,
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  HeadingText: {
    fontFamily: "Amaranth_400Regular",
    fontSize: 28,
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
    marginTop: 12,
  },
  text: {
    fontFamily: "OpenSans_400Regular",
    color: "white",
  },
});

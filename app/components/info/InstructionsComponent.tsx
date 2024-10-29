import { JSX } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "app/utils/constants";

import Dots from "app/components/programs/Dots";

type Page = { pageName: JSX.ElementType };

interface InstructionsProps {
  innerWidth: number;
  pages: Page[];
  activeIndex: number;
  setActiveIndex: ((index: number) => void) | (() => void);
}

export default function InstructionsComponent({
  innerWidth,
  pages,
  activeIndex,
  setActiveIndex,
}: InstructionsProps) {
  const logo = require("assets/images/logoTransparent.png");

  return (
    <>
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
              <page.pageName />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.dotsContainer}>
        {new Array(pages.length).fill(0).map((_, index) => (
          <Dots key={index} index={index} activeIndex={activeIndex} />
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  logo: {
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
});

import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import { colors } from "app/utils/constants";

import Coherent from "app/components/programs/pages/Coherent";
import CoherentOptions from "app/components/programs/pages/CoherentOptions";
import FourFourSixTwo from "app/components/programs/pages/FourFourSixTwo";
import FourFourSixTwoOptions from "app/components/programs/pages/FourFourSixTwoOptions";
import Box from "app/components/programs/pages/Box";
import BoxOptions from "app/components/programs/pages/BoxOptions";
import Custom from "app/components/programs/pages/Custom";
import CustomOptions from "app/components/programs/pages/CustomOptions";
import Dots from "app/components/programs/Dots";

const { height, width } = Dimensions.get("window");
const maxWidth = 500;
const maxHeight = 800;
const pageWidth = width > maxWidth ? maxWidth : width;
const pageHeight = height > maxHeight ? maxHeight : height;

export default function Programs() {
  const visibility = NavigationBar.useVisibility();

  const [activeIndex, setActiveIndex] = useState(0);

  const pages = [
    { top: Coherent, bottom: CoherentOptions },
    { top: FourFourSixTwo, bottom: FourFourSixTwoOptions },
    { top: Box, bottom: BoxOptions },
    { top: Custom, bottom: CustomOptions },
  ];

  useEffect(() => {
    if (visibility === "visible") {
      const interval = setTimeout(() => {
        NavigationBar.setVisibilityAsync("hidden");
        StatusBar.setHidden(true);
      }, 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [visibility]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={true}
      />
      <View style={{ height: pageHeight, width: pageWidth }}>
        <View>
          <ScrollView
            horizontal
            scrollEventThrottle={16}
            pagingEnabled
            decelerationRate={"fast"}
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const scrollOffset = nativeEvent.contentOffset.x;
              const activeIndex = scrollOffset / pageWidth;
              setActiveIndex(activeIndex);
            }}
          >
            {pages.map((page, index) => (
              <View key={index} style={styles.topContainer}>
                <page.top />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.dotsContainer}>
          {new Array(pages.length).fill(0).map((_, index) => (
            <Dots key={index} index={index} activeIndex={activeIndex} />
          ))}
        </View>
        {pages.map((page, index) => {
          if (Math.round(activeIndex) === index) {
            return <page.bottom key={index} pageWidth={pageWidth} />;
          }
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingTop: 6,
  },
  topContainer: {
    width: pageWidth,
    paddingHorizontal: 35,
  },
  dotsContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
});

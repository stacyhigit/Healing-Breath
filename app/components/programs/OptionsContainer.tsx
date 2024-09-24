import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface ContainerProps {
  pageWidth: number;
  children: ReactNode;
}

export default function OptionsContainer({
  pageWidth,
  children,
}: ContainerProps) {
  return (
    <View style={[styles.container, { width: pageWidth }]}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.scrollView}
      >
        {children}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 35,
  },
});

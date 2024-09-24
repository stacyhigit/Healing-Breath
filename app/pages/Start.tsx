import { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as Font from "expo-font";
import {
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
} from "@expo-google-fonts/open-sans";
import { Amaranth_400Regular } from "@expo-google-fonts/amaranth";

import { RootStackParamList } from "app/Navigation";
import { colors } from "app/utils/constants";
import { useAppSelector } from "app/store/store";

import StartPage from "app/components/info/StartPage";

type StartProps = NativeStackScreenProps<RootStackParamList, "Start">;

export default function Start({ navigation }: StartProps) {
  const insets = useSafeAreaInsets();
  const visibility = NavigationBar.useVisibility();
  const [appIsReady, setAppIsReady] = useState(false);

  const showInstructions = useAppSelector(
    (state) => state.programs.showInstructions
  );

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

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Amaranth_400Regular,
          OpenSans_400Regular,
          OpenSans_400Regular_Italic,
        });

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Error loading fonts: ", error);
      } finally {
        if (!appIsReady && !showInstructions) {
          navigation.navigate("Programs");
        }
        setAppIsReady(true);
      }
    }
    prepare();
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={true}
      />
      <StartPage />
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
});

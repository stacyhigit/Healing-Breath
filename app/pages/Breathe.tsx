import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { mix, withPause } from "react-native-redash";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAppSelector } from "app/store/store";
import { RootStackParamList } from "app/Navigation";
import { playSound, Sound } from "app/utils/sounds";
import { circleTiming, formatTime } from "app/utils/breathe";
import { durationNumbers } from "app/utils/constants";

import Circle from "app/components/breathe/Circle";
import ProgressButtons from "app/components/breathe/ProgressButtons";
import ProgressBar from "app/components/breathe/ProgressBar";
import InitialStart from "app/components/breathe/InitialStart";
import TimeCircles from "app/components/ui/TimeCircles";
import PhaseText from "app/components/breathe/PhaseText";

const { width } = Dimensions.get("window");

type BreatheProps = NativeStackScreenProps<RootStackParamList, "Breathe">;

export default function Breathe({ navigation, route }: BreatheProps) {
  const insets = useSafeAreaInsets();

  const [started, setStarted] = useState(false);
  const {
    inhaleSeconds,
    inhaleHoldSeconds,
    exhaleSeconds,
    exhaleHoldSeconds,
    bpm,
  } = route.params;

  const soundsStored = useAppSelector((state) => state.sounds);
  const durationIndex = useAppSelector((state) => state.programs.durationIndex);

  const totalTimeMinutes = durationNumbers[durationIndex];
  const totalTimeSeconds = totalTimeMinutes * 60;

  const progressCircles = useSharedValue(0);
  const progressSeconds = useSharedValue(0);
  const paused = useSharedValue(true);
  const phaseText = useSharedValue("inhale");
  const phaseScale = useSharedValue(0);
  const sounds = useSharedValue(soundsStored);

  const progressText = useDerivedValue(() => {
    return formatTime(Math.floor(progressSeconds.value));
  });

  const handleReset = () => {
    paused.value = true;
    progressSeconds.value = 0;
    progressCircles.value = withTiming(0, circleTiming(1));
    phaseScale.value = withTiming(0, { duration: 300 });
  };

  const handleInitialStart = () => {
    setStarted(true);
    progressSeconds.value = 0;
    startAnimation();
  };

  const handlePlayPause = () => {
    "worklet";
    if (totalTimeSeconds === progressSeconds.value) {
      progressSeconds.value = 0;
      startAnimation();
      return;
    }
    if (progressSeconds.value === 0) {
      startAnimation();
      return;
    }
    paused.value = !paused.value;
  };

  const handlePlaySound = useCallback(
    (sound: Sound) => {
      "worklet";
      if (sounds.value.playSounds && sound.path) {
        runOnJS(playSound)(sound);
      }
    },
    [sounds]
  );

  const setPhaseText = useCallback(
    (text: string) => {
      "worklet";
      phaseScale.value = withSequence(
        withTiming(0.5, { duration: 200 }, () => {
          phaseText.value = text;
        }),
        withTiming(1, { duration: 200 })
      );
    },
    [phaseScale, phaseText]
  );

  const startAnimation = useCallback(() => {
    const soundSettings = sounds.value.soundSettings;
    handlePlaySound(soundSettings.inhaleSound);
    phaseText.value = "inhale";
    phaseScale.value = withTiming(1, { duration: 200 });
    paused.value = false;

    progressSeconds.value = withPause(
      withTiming(
        totalTimeSeconds,
        {
          duration: totalTimeSeconds * 1000,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            paused.value = true;
            progressCircles.value = withTiming(0, circleTiming(1));
            phaseScale.value = withTiming(0, { duration: 300 });
          }
        }
      ),
      paused
    );

    progressCircles.value = withPause(
      withRepeat(
        withSequence(
          withTiming(1, circleTiming(inhaleSeconds), () => {
            if (!paused.value) {
              if (inhaleHoldSeconds) {
                handlePlaySound(soundSettings.inhaleHoldSound);
                setPhaseText("hold");
              } else {
                handlePlaySound(soundSettings.exhaleSound);
                setPhaseText("exhale");
              }
            }
          }),
          withTiming(1, { duration: inhaleHoldSeconds * 1000 }, () => {
            if (inhaleHoldSeconds && !paused.value) {
              handlePlaySound(soundSettings.exhaleSound);
              setPhaseText("exhale");
            }
          }),
          withTiming(0, circleTiming(exhaleSeconds), () => {
            if (!paused.value) {
              if (exhaleHoldSeconds) {
                handlePlaySound(soundSettings.exhaleHoldSound);
                setPhaseText("hold");
              } else {
                handlePlaySound(soundSettings.inhaleSound);
                setPhaseText("inhale");
              }
            }
          }),
          withTiming(0, { duration: exhaleHoldSeconds * 1000 }, () => {
            if (exhaleHoldSeconds && !paused.value) {
              handlePlaySound(soundSettings.inhaleSound);
              setPhaseText("inhale");
            }
          })
        ),
        -1,
        false
      ),
      paused
    );
  }, [
    paused,
    progressCircles,
    progressSeconds,
    totalTimeSeconds,
    inhaleSeconds,
    inhaleHoldSeconds,
    exhaleSeconds,
    exhaleHoldSeconds,
    sounds,
    phaseScale,
    phaseText,
    setPhaseText,
    handlePlaySound,
  ]);

  const animatedStyleCircles = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ rotate: `${mix(progressCircles.value, -Math.PI, 0)}rad` }],
    marginBottom: 50,
  }));

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (!paused.value) {
        e.preventDefault();
        paused.value = true;
      }
    });

    return unsubscribe;
  }, [navigation, paused]);

  useEffect(() => {
    sounds.value = soundsStored;
  }, [soundsStored, sounds]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={true}
      />
      <Animated.View style={[animatedStyleCircles, styles.circleContainer]}>
        {new Array(6).fill(0).map((_, index) => (
          <Circle
            index={index}
            key={index}
            progress={progressCircles}
            width={width}
          />
        ))}
      </Animated.View>
      <PhaseText phaseScale={phaseScale} phaseText={phaseText} />

      <View style={styles.timeCircleContainer}>
        <TimeCircles
          inhaleSeconds={inhaleSeconds}
          inhaleHoldSeconds={inhaleHoldSeconds}
          exhaleSeconds={exhaleSeconds}
          exhaleHoldSeconds={exhaleHoldSeconds}
          bpm={bpm}
        />
      </View>
      {!started && <InitialStart handleInitialStart={handleInitialStart} />}
      {started && (
        <>
          <View style={styles.buttonContainer}>
            <ProgressButtons
              handleReset={handleReset}
              handlePlayPause={handlePlayPause}
              paused={paused}
            />
          </View>

          <ProgressBar
            totalTimeSeconds={totalTimeSeconds}
            progressSeconds={progressSeconds}
            progressText={progressText}
            width={width}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 124,
    alignItems: "center",
    justifyContent: "center",
  },
  timeCircleContainer: {
    position: "absolute",
    top: 30,
  },
});

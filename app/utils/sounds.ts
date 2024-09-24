import { Audio, AVPlaybackSource } from "expo-av";

type SoundKey =
  | "noSound"
  | "bellOne"
  | "bellFour"
  | "bellSix"
  | "bellNine"
  | "bellThirteen"
  | "bellSixteen";

export type Sound = {
  name: string;
  path: AVPlaybackSource | null;
};
type Sounds = Record<SoundKey, Sound>;

type SoundSettingsKey =
  | "inhaleSound"
  | "inhaleHoldSound"
  | "exhaleSound"
  | "exhaleHoldSound";

export type SoundSettings = Record<SoundSettingsKey, Sound>;

export const SOUNDS: Sounds = {
  noSound: {
    name: "no sound",
    path: null,
  },
  bellOne: {
    name: "bell 1",
    path: require("assets/sounds/copper-bell-ding-1.mp3"),
  },
  bellFour: {
    name: "bell 2",
    path: require("assets/sounds/copper-bell-ding-4.mp3"),
  },
  bellSix: {
    name: "bell 3",
    path: require("assets/sounds/copper-bell-ding-6.mp3"),
  },
  bellNine: {
    name: "bell 4",
    path: require("assets/sounds/copper-bell-ding-9.mp3"),
  },
  bellThirteen: {
    name: "bell 5",
    path: require("assets/sounds/copper-bell-ding-13.mp3"),
  },

  bellSixteen: {
    name: "bell 6",
    path: require("assets/sounds/copper-bell-ding-16.mp3"),
  },
};

const loadedSounds: Record<string, Audio.Sound> = {};

export const playSound = async (sound: Sound) => {
  if (sound.name === "no sound") {
    return;
  }
  let audioSound = loadedSounds[sound.name];

  if (audioSound) {
    try {
      await audioSound.replayAsync();
    } catch (error) {
      console.log("Error replaying sound: ", error);
    }
    return;
  }

  try {
    audioSound = new Audio.Sound();
    sound.path && (await audioSound.loadAsync(sound.path));
    await audioSound.playAsync();
    loadedSounds[sound.name] = audioSound;
  } catch (error) {
    console.log("Error playing sound: ", error);
  }
};

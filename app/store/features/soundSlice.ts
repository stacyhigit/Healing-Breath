import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sound, SOUNDS, SoundSettings } from "app/utils/sounds";

interface Sounds {
  playSounds: boolean;
  soundSettings: SoundSettings;
}

const initialState: Sounds = {
  playSounds: true,
  soundSettings: {
    inhaleSound: SOUNDS.bellSixteen,
    inhaleHoldSound: SOUNDS.bellSixteen,
    exhaleSound: SOUNDS.bellNine,
    exhaleHoldSound: SOUNDS.bellNine,
  },
};

export const SoundSettingsSlice = createSlice({
  name: "SoundSettings",
  initialState,
  reducers: {
    togglePlaySounds(state) {
      state.playSounds = !state.playSounds;
    },
    changeSoundSetting: (
      state,
      action: PayloadAction<{
        soundSetting: keyof SoundSettings;
        sound: Sound;
      }>
    ) => {
      state.soundSettings = {
        ...state.soundSettings,
        [action.payload.soundSetting]: action.payload.sound,
      };
    },
    reset: () => initialState,
  },
});

export default SoundSettingsSlice.reducer;
export const { togglePlaySounds, changeSoundSetting, reset } =
  SoundSettingsSlice.actions;

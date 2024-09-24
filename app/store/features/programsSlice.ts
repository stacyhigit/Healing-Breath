import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CoherentConfig = {
  breathsPerMinuteIndex: number;
};

type BoxConfig = {
  breatheSecondsIndex: number;
};

export type Customconfig = {
  inhaleSecondsIndex: number;
  inhaleHoldSecondsIndex: number;
  exhaleSecondsIndex: number;
  exhaleHoldSecondsIndex: number;
};

interface Programs {
  durationIndex: number;
  showInstructions: boolean;
  box: BoxConfig;
  coherent: CoherentConfig;
  custom: Customconfig;
}

const initialState: Programs = {
  durationIndex: 6,
  showInstructions: true,
  coherent: {
    breathsPerMinuteIndex: 3,
  },
  box: {
    breatheSecondsIndex: 3,
  },
  custom: {
    inhaleSecondsIndex: 3,
    inhaleHoldSecondsIndex: 4,
    exhaleSecondsIndex: 3,
    exhaleHoldSecondsIndex: 4,
  },
};

export const ProgramsSlice = createSlice({
  name: "Programs",
  initialState,
  reducers: {
    changeDuration(state, action: PayloadAction<{ index: number }>) {
      state.durationIndex = action.payload.index;
    },
    changeBoxSecondsIndex(
      state,
      action: PayloadAction<{
        index: number;
      }>
    ) {
      state.box.breatheSecondsIndex = action.payload.index;
    },
    changeCoherentBPMIndex(
      state,
      action: PayloadAction<{
        index: number;
      }>
    ) {
      state.coherent.breathsPerMinuteIndex = action.payload.index;
    },
    changeCustomSecondsIndex(
      state,
      action: PayloadAction<{
        key: keyof Customconfig;
        index: number;
      }>
    ) {
      state.custom[action.payload.key] = action.payload.index;
    },
    toggleShowInstructions(state) {
      state.showInstructions = !state.showInstructions;
    },
    reset: () => initialState,
  },
});

export default ProgramsSlice.reducer;
export const {
  changeDuration,
  changeBoxSecondsIndex,
  changeCoherentBPMIndex,
  changeCustomSecondsIndex,
  toggleShowInstructions,
  reset,
} = ProgramsSlice.actions;

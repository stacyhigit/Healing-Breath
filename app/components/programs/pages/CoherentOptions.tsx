import { useAppDispatch, useAppSelector } from "app/store/store";
import { changeCoherentBPMIndex } from "app/store/features/programsSlice";
import { bpmNumbers } from "app/utils/constants";

import NumberPickerContainer from "../NumberPickerContainer";
import OptionsContainer from "../OptionsContainer";
import NavigateButton from "../NavigateButton";

interface coherentOptionsProps {
  pageWidth: number;
}

export default function CoherentOptions({ pageWidth }: coherentOptionsProps) {
  const dispatch = useAppDispatch();

  const setBPMIndex = (index: number) => {
    dispatch(changeCoherentBPMIndex({ index }));
  };

  const selectedBPMIndex = useAppSelector(
    (state) => state.programs.coherent.breathsPerMinuteIndex
  );

  const bpm = bpmNumbers[selectedBPMIndex];
  const breatheSeconds = Math.round((60 / 2 / bpm) * 10) / 10;

  const navigationProps = {
    inhaleSeconds: breatheSeconds,
    inhaleHoldSeconds: 0,
    exhaleSeconds: breatheSeconds,
    exhaleHoldSeconds: 0,
    bpm,
  };

  return (
    <OptionsContainer pageWidth={pageWidth}>
      <NavigateButton navigationProps={navigationProps} />
      <NumberPickerContainer
        selectedNumberIndex={selectedBPMIndex}
        setSelectedNumber={setBPMIndex}
        timerNumbers={bpmNumbers}
        timerText="Breaths per minute:"
        unitText=""
        footerText={`inhale for ${breatheSeconds} seconds, exhale for ${breatheSeconds} seconds`}
      />
    </OptionsContainer>
  );
}

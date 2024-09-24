import { useAppDispatch, useAppSelector } from "app/store/store";
import { changeBoxSecondsIndex } from "app/store/features/programsSlice";
import { inhaleExhaleNumbers } from "app/utils/constants";

import TimeCircles from "app/components/ui/TimeCircles";
import NumberPickerContainer from "../NumberPickerContainer";
import OptionsContainer from "../OptionsContainer";
import NavigateButton from "../NavigateButton";

interface BoxOptionsProps {
  pageWidth: number;
}

export default function BoxOptions({ pageWidth }: BoxOptionsProps) {
  const dispatch = useAppDispatch();

  const setBreatheSeconds = (index: number) => {
    dispatch(changeBoxSecondsIndex({ index }));
  };

  const selectedBreatheSecondsIndex = useAppSelector(
    (state) => state.programs.box.breatheSecondsIndex
  );

  const breatheSeconds = inhaleExhaleNumbers[selectedBreatheSecondsIndex];

  const navigationProps = {
    inhaleSeconds: breatheSeconds,
    inhaleHoldSeconds: breatheSeconds,
    exhaleSeconds: breatheSeconds,
    exhaleHoldSeconds: breatheSeconds,
  };

  return (
    <OptionsContainer pageWidth={pageWidth}>
      <NavigateButton navigationProps={navigationProps} />
      <NumberPickerContainer
        selectedNumberIndex={selectedBreatheSecondsIndex}
        setSelectedNumber={setBreatheSeconds}
        timerNumbers={inhaleExhaleNumbers}
        timerText="Breath count:"
        unitText="seconds"
      />
      <TimeCircles
        inhaleSeconds={breatheSeconds}
        inhaleHoldSeconds={breatheSeconds}
        exhaleSeconds={breatheSeconds}
        exhaleHoldSeconds={breatheSeconds}
      />
    </OptionsContainer>
  );
}

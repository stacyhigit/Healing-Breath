import TimeCircles from "app/components/ui/TimeCircles";
import OptionsContainer from "../OptionsContainer";
import NavigateButton from "../NavigateButton";

interface FourFourSixTwoOptionsProps {
  pageWidth: number;
}

export default function FourFourSixTwoOptions({
  pageWidth,
}: FourFourSixTwoOptionsProps) {
  const inhaleSeconds = 4;
  const inhaleHoldSeconds = 4;
  const exhaleSeconds = 6;
  const exhaleHoldSeconds = 2;

  const navigationProps = {
    inhaleSeconds,
    inhaleHoldSeconds,
    exhaleSeconds,
    exhaleHoldSeconds,
  };

  return (
    <OptionsContainer pageWidth={pageWidth}>
      <NavigateButton navigationProps={navigationProps} />
      <TimeCircles
        inhaleSeconds={inhaleSeconds}
        inhaleHoldSeconds={inhaleHoldSeconds}
        exhaleSeconds={exhaleSeconds}
        exhaleHoldSeconds={exhaleHoldSeconds}
      />
    </OptionsContainer>
  );
}

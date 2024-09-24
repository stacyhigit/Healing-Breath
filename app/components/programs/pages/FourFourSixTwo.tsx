import ImageComponent from "../ImageComponent";
import TextComponent from "../TextComponent";

export default function FourFourSixTwo() {
  const image = require("assets/images/fourfoursixtwo.png");

  return (
    <>
      <ImageComponent image={image} />
      <TextComponent>
        This practice can help to calm the nervous system, clear the head of
        distractions, induce relaxation, focus, and clarity.
      </TextComponent>
      <TextComponent>
        It can cut through intense anger, addictive urges, repetitive thoughts,
        and even suicidal thoughts.
      </TextComponent>
    </>
  );
}

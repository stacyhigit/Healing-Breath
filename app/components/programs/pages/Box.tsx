import TextComponent from "../TextComponent";
import ImageComponent from "../ImageComponent";

export default function Box() {
  const image = require("assets/images/box.png");

  return (
    <>
      <ImageComponent image={image} />
      <TextComponent>
        Navy SEALs use box breathing as a quick way to remain calm and collected
        in dangerous situations.
      </TextComponent>
      <TextComponent>
        Once you are familiar with this technique, you can use it at any time to
        relieve stress, calm down, and maintain an alert, focused mind.
      </TextComponent>
    </>
  );
}

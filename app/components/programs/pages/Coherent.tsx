import ImageComponent from "../ImageComponent";
import TextComponent from "../TextComponent";

export default function Coherent() {
  const image = require("assets/images/coherent.png");

  return (
    <>
      <ImageComponent image={image} />
      <TextComponent>
        Coherent breathing is breating at a rate of 5 or 6 breaths per minute
        with equal inhales and exhales.
      </TextComponent>
      <TextComponent>
        It can help to restore balance to stress response systems, calm an
        agitated mind, relieve symptoms of anxiety and PTSD, and improve health.
      </TextComponent>
    </>
  );
}

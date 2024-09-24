import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";

interface ImageComponentProps {
  image: ImageSourcePropType;
}
const height = Dimensions.get("window").height;
const imageSize = height > 700 ? 280 : 210;

export default function ImageComponent({ image }: ImageComponentProps) {
  return <Image source={image} style={styles.image} />;
}
const styles = StyleSheet.create({
  image: {
    height: imageSize,
    width: imageSize,
    alignSelf: "center",
  },
});

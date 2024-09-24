import { Image, StyleSheet, View } from "react-native";

export default function Custom() {
  const image = require("assets/images/custom.png");
  const logo = require("assets/images/logoTransparent.png");

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 280,
  },
  logo: {
    flex: 1,
    width: 280,
    height: 280,
  },
});

import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface PressableComponentProps {
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  disabled?: boolean;
}

export default function PressableComponent({
  style,
  onPress,
  children,
  disabled = false,
}: PressableComponentProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        style as StyleProp<ViewStyle>,
        pressed && styles.pressedStyle,
      ]}
      android_ripple={{ color: "black" }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressedStyle: {
    opacity: 0.7,
  },
});

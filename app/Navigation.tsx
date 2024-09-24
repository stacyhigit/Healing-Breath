import {
  DefaultTheme,
  NavigationContainer,
  NavigationProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Programs from "./pages/Programs";
import SelectSound from "./pages/SelectSound";
import Sounds from "./pages/Sounds";
import ProgramsHeader from "./components/programs/ProgramsHeader";
import Breathe from "./pages/Breathe";
import BreatheHeader from "./components/breathe/BreatheHeader";
import CustomOptionsSettings from "./pages/CustomOptionsSettings";
import Start from "./pages/Start";
import Instructions from "./pages/Instructions";
import InfoHeader from "./components/info/infoHeader";

import { colors } from "app/utils/constants";
import { SoundSettings } from "./utils/sounds";

const Stack = createNativeStackNavigator<RootStackParamList>();
export type BreatheProps = {
  inhaleSeconds: number;
  inhaleHoldSeconds: number;
  exhaleSeconds: number;
  exhaleHoldSeconds: number;
  bpm?: number;
};
export type RootStackParamList = {
  Start: undefined;
  Programs: undefined;
  Instructions: undefined;
  Sounds: undefined;
  "Select Sound": { soundSetting: keyof SoundSettings; label: string };
  Options: undefined;
  Breathe: BreatheProps;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Group screenOptions={{ header: ProgramsHeader }}>
          <Stack.Screen
            name="Programs"
            component={Programs}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ header: InfoHeader }}>
          <Stack.Screen
            name="Instructions"
            component={Instructions}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Group>

        <Stack.Group screenOptions={{ header: BreatheHeader }}>
          <Stack.Screen
            name="Breathe"
            component={Breathe}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="Sounds"
            options={{
              headerShown: true,
            }}
            component={Sounds}
          />
          <Stack.Screen
            name="Select Sound"
            options={{
              headerShown: true,
            }}
            component={SelectSound}
          />
          <Stack.Screen
            name="Options"
            options={{
              headerShown: true,
            }}
            component={CustomOptionsSettings}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

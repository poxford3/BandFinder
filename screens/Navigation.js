import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./MainScreen";
import AlbumScreen from "./AlbumScreen";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={
          {
            //   headerShown: false,
            // gestureEnabled: false
          }
        }
        initialRouteName="Intro"
      >
        <Stack.Screen name="Intro" component={MainScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

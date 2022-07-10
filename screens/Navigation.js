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
        initialRouteName="Album List"
      >
        <Stack.Screen name="Album List" component={MainScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

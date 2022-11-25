import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./MainScreen";
import AlbumScreen from "./AlbumScreen";
import SearchScreen from "./SearchScreen";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={
          {
            //   headerShown: false,
            //   gestureEnabled: false
          }
        }
        initialRouteName="Search"
      >
        <Stack.Screen
          name="Album List"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={({ route }) => ({ title: route.params.albumName })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

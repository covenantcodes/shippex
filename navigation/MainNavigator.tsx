// MainNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./Auth/AuthNavigator";
import TabNavigator from "./Tab/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;

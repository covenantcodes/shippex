// MainNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/Splash/SplashScreen";
import AuthNavigator from "./Auth/AuthNavigator";
import TabNavigator from "./Tab/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{
            headerShown: false,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
            transitionSpec: {
              open: {
                animation: "timing",
                config: {
                  duration: 500,
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 500,
                },
              },
            },
          }}
        />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;

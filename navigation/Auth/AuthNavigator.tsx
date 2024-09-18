import { createStackNavigator } from "@react-navigation/stack";
import LoginHome from "../../screens/Auth/LoginHome";
import SplashScreen from "../../screens/Splash/SplashScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }} // Hide the header for SplashScreen
      />
      <Stack.Screen
        name="LoginHome"
        component={LoginHome}
        options={{
          headerShown: false, // Hide the header for Login screen
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
    </Stack.Navigator>
  );
}

export default AuthNavigator;

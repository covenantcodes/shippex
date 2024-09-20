import { createStackNavigator } from "@react-navigation/stack";
import LoginHome from "../../screens/Auth/LoginHome";
import SplashScreen from "../../screens/Splash/SplashScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginHome"
        component={LoginHome}
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
    </Stack.Navigator>
  );
}

export default AuthNavigator;

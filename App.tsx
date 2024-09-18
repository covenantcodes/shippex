import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./navigation/Auth/AuthNavigator";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    // Load your fonts here
    PoppinsThin: require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("./assets/fonts/Poppins/Poppins-ThinItalic.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsExtraLight: require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("./assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;

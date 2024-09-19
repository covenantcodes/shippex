import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Shipments from "../../screens/Shipments/Shipments";
import Scan from "../../screens/Scan/Scan";
import Wallet from "../../screens/Wallet/Wallet";
import Profile from "../../screens/Profile/Profile";
import images from "../../configs/images";

import COLORS from "../../configs/color";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconSource;
          let widthIconSize = 20;
          let heightIconSize = 20;

          switch (route.name) {
            case "Shipments":
              iconSource = focused
                ? images.shipmentsIconActive
                : images.shipmentsIconInactive;
              widthIconSize = 25; // Set width for Shipments
              heightIconSize = 25; // Set height for Shipments
              break;
            case "Scan":
              iconSource = focused
                ? images.scanIconActive
                : images.scanIconInActive;
              widthIconSize = 25;
              heightIconSize = 20; // Keep height as 20 for Scan
              break;
            case "Wallet":
              iconSource = focused
                ? images.walletIconActive
                : images.walletIconInactive;
              widthIconSize = 25;
              heightIconSize = 20; // Keep height as 20 for Wallet
              break;
            case "Profile":
              iconSource = focused
                ? images.ProfileIconActive
                : images.ProfileIconInactive;
              widthIconSize = 25; // Set width for Profile
              heightIconSize = 25; // Set height for Profile
              break;
            default:
              iconSource = images.shipmentsIconInactive;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: widthIconSize,
                height: heightIconSize,
                marginTop: 8,
              }}
            />
          );
        },
        tabBarActiveTintColor: COLORS.primaryColor,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          height: 55 + (Platform.OS === "ios" ? 20 : 0), // Adjust height for iOS
          paddingBottom: Platform.OS === "ios" ? 20 : 2, // Extra padding for iOS devices
        },
        tabBarLabelStyle: { fontFamily: "PoppinsMedium", fontSize: 12 },
      })}
    >
      <Tab.Screen
        name="Shipments"
        component={Shipments}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

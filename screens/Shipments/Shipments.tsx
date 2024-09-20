import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Import Ionicons for the icons
import COLORS from "../../configs/color";
import images from "../../configs/images";
import Notification from "../../svg/Notification";
import ShipmentsList from "./ShipmentsList";

const Shipments: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={images.profile} style={styles.profileImageContainer} />
        </View>

        <View style={styles.logoContainer}>
          <Image source={images.logoBlue} style={styles.logoImage} />
        </View>

        <View style={styles.notificationContainer}>
          <View style={styles.notificationBox}>
            <Notification />
          </View>
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTextGreetings}>Hello,</Text>
        <Text style={styles.welcomeText}>Ibrahim Shaker</Text>
      </View>

      {/* Search Input */}
      <View
        style={[
          styles.searchContainer,
          isFocused && { borderColor: COLORS.primaryColor },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={isFocused ? COLORS.primaryColor : COLORS.grey}
        />
        <TextInput
          style={[
            styles.searchInput,
            { color: isFocused ? COLORS.primaryColor : COLORS.grey },
          ]}
          placeholder="Search"
          placeholderTextColor={COLORS.grey}
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Buttons below search input */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={COLORS.grey} />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons
            name="line-scan"
            size={20}
            color={COLORS.white}
          />
          <Text style={styles.addButtonText}>Add Scan</Text>
        </TouchableOpacity>
      </View>

      <ShipmentsList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS == "android" ? 45 : 0,
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 45,
  },
  logoContainer: {
    padding: 5,
    // width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 100,
    height: 15,
  },
  notificationContainer: {
    alignItems: "center",
    justifyContent: "center",
    // width: "20%",
  },
  notificationBox: {
    backgroundColor: COLORS.background,
    padding: 7,
    borderRadius: 40,
  },
  welcomeContainer: {
    padding: 20,
  },
  welcomeTextGreetings: {
    fontSize: 16,
    fontFamily: "PoppinsLight",
  },
  welcomeText: {
    fontSize: 27,
    fontFamily: "PoppinsSemiBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "PoppinsLight",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 15,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
    width: "48%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  filterButtonText: {
    marginLeft: 5,
    color: COLORS.grey,
    fontFamily: "PoppinsLight",
  },
  addButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    marginLeft: 5,
    color: COLORS.white,
    fontFamily: "PoppinsLight",
  },
});

export default Shipments;

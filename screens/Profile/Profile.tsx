import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import COLORS from "../../configs/color";

const Profile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/images/shippex working.gif")} />
        <Text style={styles.title}>Coming Soon!</Text>
        <Text style={styles.details}>
          We are actively working on this screen. You will get notified once it
          is done.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 20,
    fontFamily: "PoppinsSemiBold",
  },
  details: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
});

export default Profile;

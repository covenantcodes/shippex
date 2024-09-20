import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import COLORS from "../../configs/color";
import CustomButton from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import images from "../../configs/images";
import { useNavigation } from "@react-navigation/native";

const LoginHome: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Validate the URL
  const validateURL = (input: string) => {
    return input.length > 0; // You can add more robust validation if needed
  };

  // Validate the Username/Email
  const validateUsername = (input: string) => {
    return input.length > 0; // You can add more email-specific validation
  };

  // Validate the Password (at least 6 characters)
  const validatePassword = (input: string) => {
    return input.length >= 6;
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Use useEffect to check if the button should be enabled
  useEffect(() => {
    const isFormValid =
      validateURL(url) &&
      validateUsername(username) &&
      validatePassword(password);
    setIsButtonDisabled(!isFormValid);
  }, [url, username, password]);

  const handleLogin = () => {
    navigation.navigate("Main");
    console.log("Login pressed with:", { url, username, password });
    // Implement your login logic here
    // After successful login, you might want to close the modal
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <CustomButton
        width="100%"
        title="Login"
        color="#fff"
        textColor={COLORS.primaryColor}
        onPress={toggleModal}
        style={styles.button}
        fontFamily="PoppinsSemiBold"
      />

      {/* Custom Modal for Login Form */}
      <CustomModal visible={modalVisible} onClose={toggleModal}>
        <View style={styles.modalContentContainer}>
          <TouchableOpacity style={styles.modalHeader} onPress={toggleModal}>
            <Ionicons
              name="chevron-back"
              color={COLORS.primaryColor}
              size={24}
            />
            <Text style={styles.headerText}>Cancel</Text>
          </TouchableOpacity>

          <View style={styles.loginInfo}>
            <Text style={styles.loginInfoHeader}>Login</Text>
            <Text style={styles.loginInfoText}>
              Please enter your URL, Username/Email, and Password to log in.
            </Text>
          </View>

          <CustomInput
            type="URL"
            placeholder="URL"
            style={styles.input}
            value={url}
            onChangeText={setUrl}
          />
          <CustomInput
            type="Standard"
            placeholder="Username/Email"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <CustomInput
            type="Password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              width="100%"
              title="Login"
              color={COLORS.primaryColor}
              textColor="#fff"
              onPress={handleLogin}
              style={styles.loginButton}
              fontFamily="PoppinsSemiBold"
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 50,
  },
  button: {
    position: "absolute",
    bottom: 25,
  },
  modalHeader: {
    flexDirection: "row",
  },
  headerText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    color: COLORS.primaryColor,
    marginLeft: 3,
  },
  loginInfo: {
    paddingVertical: 10,
  },
  loginInfoHeader: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 30,
  },
  loginInfoText: {
    fontFamily: "PoppinsLight",
    color: COLORS.grey,
    paddingVertical: 16,
  },

  modalContentContainer: {
    padding: 20,
  },

  input: {
    backgroundColor: COLORS.background,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginButton: {
    fontFamily: "PoppinsRegular",
  },
  buttonContainer: {
    marginTop: 200,
    marginBottom: 50,
  },
});

export default LoginHome;

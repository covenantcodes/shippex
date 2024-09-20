import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import COLORS from "../../configs/color";
import CustomButton from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import images from "../../configs/images";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../services/apiServices";
import { useUserContext } from "../../Context/UserContext";
import axios from "axios";

const LoginHome: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state
  const { setUserData } = useUserContext();

  const validateURL = (input: string) => input.length > 0;
  const validateUsername = (input: string) => input.length > 0;
  const validatePassword = (input: string) => input.length >= 6;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const isFormValid =
      validateURL(url) &&
      validateUsername(username) &&
      validatePassword(password);
    setIsButtonDisabled(!isFormValid);
  }, [url, username, password]);

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await login(username, password);

      if (response && response.status === 200) {
        console.log("Login successful:", response);
        toggleModal(); // Close the modal
        Alert.alert("Login Successful", "Logged In");
        console.log(response.data);
        setUserData(response.data);
        navigation.navigate("Main");
      } else {
        console.log("Login Failed", response.message || "Invalid credentials.");
        Alert.alert("Login Failed", response.message || "Invalid credentials.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          Alert.alert("Login Failed", "Invalid username or password.");
        } else {
          Alert.alert(
            "Login Error",
            error.response?.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else {
        console.error("Login error:", error);
        Alert.alert(
          "Login Error",
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false); // Stop loading after login attempt
    }
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
              disabled={isButtonDisabled || loading} // Disable if form is invalid or loading
              loading={loading} // Show loading animation
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

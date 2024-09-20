import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// CONFIGS IMPORT
import COLORS from "../../configs/color";
import images from "../../configs/images";
// CUSTOM COMPONENTS IMPORT
import CustomButton from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";

import { Ionicons } from "@expo/vector-icons";
import { login } from "../../services/apiServices";
import { useUserContext } from "../../Context/UserContext";

const LoginHome: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ text1: "", text2: "" });

  const { setUserData } = useUserContext();

  //FORM INPUT VALIDATION
  const validateURL = (input: string) => input.length > 0;
  const validateUsername = (input: string) => input.length > 0;
  const validatePassword = (input: string) => input.length >= 6;

  useEffect(() => {
    const isFormValid =
      validateURL(url) &&
      validateUsername(username) &&
      validatePassword(password);
    setIsButtonDisabled(!isFormValid);
  }, [url, username, password]);

  // MODAL TOGGLE
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // HANDLE FORM LOGIN
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(username, password);

      if (response && response.status === 200) {
        console.log("Login successful:", response);
        toggleModal();
        setUserData(response.data);
        navigation.navigate("Main");
      } else {
        showErrorModal(
          "Login Failed",
          response.message || "Invalid credentials."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          showErrorModal("Login Failed", "Invalid username or password.");
        } else {
          showErrorModal(
            "Login Error",
            error.response?.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else {
        console.error("Login error:", error);
        showErrorModal(
          "Login Error",
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const showErrorModal = (text1: string, text2: string) => {
    setErrorMessage({ text1, text2 });
    setErrorModalVisible(true);
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
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
              disabled={isButtonDisabled || loading}
              loading={loading}
            />
          </View>
        </View>
      </CustomModal>

      {/* Error Modal */}
      <CustomModal visible={errorModalVisible} onClose={handleCloseErrorModal}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/error.gif")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={styles.modalContentContainer}>
          <Text style={styles.errorHeaderText}>{errorMessage.text1}</Text>
          <Text style={styles.errorBody}>{errorMessage.text2}</Text>
          <CustomButton
            title="Retry"
            color={COLORS.primaryColor}
            textColor="#fff"
            onPress={handleCloseErrorModal}
            style={styles.loginButton}
          />
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

  errorHeaderText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    color: COLORS.primaryColor,
    marginLeft: 3,
    textAlign: "center",
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

  errorBody: {
    fontFamily: "PoppinsLight",
    color: COLORS.grey,
    paddingVertical: 16,
    textAlign: "center",
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

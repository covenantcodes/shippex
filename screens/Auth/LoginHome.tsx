import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import COLORS from "../../configs/color";
import CustomButton from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";
import { Ionicons } from "@expo/vector-icons";

const LoginHome: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [urlFocused, setUrlFocused] = useState(false);
  const [url, setUrl] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
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
        <View style={styles.modalHeader}>
          <Ionicons name="chevron-back" color={COLORS.primaryColor} size={24} />
          <Text style={styles.headerText}>Cancel</Text>
        </View>

        <View style={styles.loginInfo}>
          <Text style={styles.loginInfoHeader}>Login</Text>

          <Text style={styles.loginInfoText}>
            Please enter your First, Last name and your phone number in order to
            register.
          </Text>
        </View>

        <CustomInput type="URL" placeholder="URL" style={styles.input} />
        <CustomInput
          type="Standard"
          placeholder="Username/Email"
          style={styles.input}
        />
        <CustomInput
          type="Password"
          placeholder="Password"
          style={styles.input}
        />

        {/* URL Input with non-editable part and focus behavior */}
        {/* <View
          style={[
            styles.urlInputContainer,
            urlFocused && { borderColor: COLORS.primaryColor },
          ]}
        >
          <View>
            <Text style={styles.urlText}>https://</Text>
          </View>
          <TextInput
            style={[styles.input, styles.urlInput]}
            placeholder="www.brandimic.com"
            placeholderTextColor={urlFocused ? "transparent" : "#a0a0a0"}
            onFocus={() => setUrlFocused(true)}
            onBlur={() => setUrlFocused(false)}
            value={url}
            onChangeText={setUrl}
          />
          {urlFocused && <Text style={styles.urlPlaceholder}>URL</Text>}
        </View>

        <TextInput placeholder="Username / Email" style={styles.input} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        /> */}

        <View style={styles.buttonContainer}>
          <CustomButton
            width="100%"
            title="Login"
            color={COLORS.primaryColor}
            textColor="#fff"
            onPress={() => alert("Login pressed")}
            style={styles.loginButton}
            fontFamily="PoppinsSemiBold"
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
    paddingVertical: 12,
    flexDirection: "row",
  },
  headerText: {
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
  input: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  urlInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    marginBottom: 15,
    borderRadius: 8,
    position: "relative",
    borderWidth: 1,
  },
  urlText: {
    color: "#58536E",
    marginLeft: 5,
  },
  urlInput: {
    flex: 1,
    borderWidth: 1,
    marginTop: 20,
  },
  urlPlaceholder: {
    position: "absolute",
    left: 70,
    top: 8,
    fontSize: 12,
    color: COLORS.primaryColor,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 5,
  },
  loginButton: {
    fontFamily: "PoppinsRegular",
  },
  buttonContainer: {
    marginTop: 250,
    marginBottom: 50,
  },
});

export default LoginHome;

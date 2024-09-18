import { StyleSheet, Text, View, Image } from "react-native";
import COLORS from "../../configs/color";
import CustomButton from "../../components/CustomButton";

const LoginHome: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <CustomButton
        width="100%"
        title="Login"
        color="#fff"
        textColor="#000"
        onPress={() => alert("Login with Google Pressed")}
        style={styles.button}
      />
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
});

export default LoginHome;

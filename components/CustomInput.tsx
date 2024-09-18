import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import COLORS from "../configs/color"; // Adjust the path for COLORS file

interface CustomInputProps {
  type: "URL" | "Standard" | "Password";
  placeholder: string;
  style?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const renderInput = () => {
    const inputStyle = isFocused
      ? [styles.input, styles.focusedInput]
      : styles.input;

    const containerStyle = isFocused
      ? [styles.container, styles.focusedContainer]
      : styles.container;

    switch (type) {
      case "URL":
        return (
          <View style={[styles.urlContainer, style]}>
            <View style={styles.urlPrefix}>
              <Text style={styles.urlText}>https:// |</Text>
            </View>
            <TextInput
              style={[inputStyle, styles.urlInput]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={COLORS.grey}
            />
            {isFocused && (
              <Text style={styles.placeholderFocused}>{placeholder}</Text>
            )}
          </View>
        );

      case "Password":
        return (
          <View style={[containerStyle, style]}>
            <TextInput
              style={inputStyle}
              secureTextEntry={!showPassword}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              placeholderTextColor={COLORS.grey}
            />
            {isFocused && (
              <Text style={styles.placeholderFocused}>{placeholder}</Text>
            )}
            <Text
              style={styles.togglePassword}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </Text>
          </View>
        );

      default:
        return (
          <View style={[containerStyle, style]}>
            <TextInput
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={COLORS.grey}
            />
            {isFocused && (
              <Text style={styles.placeholderFocused}>{placeholder}</Text>
            )}
          </View>
        );
    }
  };

  return <View>{renderInput()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderColor: COLORS.grey, // Default border color
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    position: "relative",
  },
  focusedContainer: {
    borderColor: COLORS.primaryColor, // Focused border color
  },
  input: {
    flex: 1,
    color: COLORS.primaryColor,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: COLORS.primaryColor, // Focused input border color
  },
  urlContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderColor: COLORS.grey, // Default border color
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    position: "relative",
  },
  urlInput: {
    flex: 1,
    paddingLeft: 5,
  },
  urlPrefix: {
    flexDirection: "row",
    alignItems: "center",
  },
  urlText: {
    color: COLORS.primaryPlaceHolderColor,
    fontSize: 16,
  },
  placeholderFocused: {
    position: "absolute",
    top: 2, // Moves the placeholder just below the border, not on it
    left: 10,
    fontSize: 12,
    backgroundColor: "#f7f7f7", // Keeps the background consistent with input background
    paddingHorizontal: 5,
    color: COLORS.primaryPlaceHolderColor,
    marginBottom: 5,
  },
  togglePassword: {
    marginLeft: 10,
    color: COLORS.primaryColor,
    fontSize: 16,
  },
});

export default CustomInput;

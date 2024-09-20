import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import COLORS from "../configs/color"; // Adjust the path for COLORS file

interface CustomInputProps {
  type: "URL" | "Standard" | "Password";
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  value,
  onChangeText,
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
          <View style={[containerStyle, style]}>
            {isFocused && (
              <View style={styles.urlPrefix}>
                <Text style={styles.urlText}>https:// |</Text>
              </View>
            )}
            <TextInput
              style={[inputStyle, isFocused ? styles.urlInput : null]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={COLORS.grey}
              autoCapitalize="none"
              value={value}
              onChangeText={onChangeText}
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
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={COLORS.grey}
              autoCapitalize="none"
              value={value}
              onChangeText={onChangeText}
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
              autoCapitalize="none"
              value={value}
              onChangeText={onChangeText}
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
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 10,
    position: "relative",
  },
  focusedContainer: {
    borderColor: COLORS.primaryColor,
  },
  input: {
    flex: 1,
    color: COLORS.primaryColor,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
  },
  focusedInput: {
    borderColor: COLORS.primaryColor,
  },
  urlInput: {
    paddingLeft: 5,
  },
  urlPrefix: {
    flexDirection: "row",
    alignItems: "center",
  },
  urlText: {
    fontFamily: "PoppinsRegular",
    color: COLORS.primaryPlaceHolderColor,
    fontSize: 16,
  },
  placeholderFocused: {
    position: "absolute",
    top: 2,
    left: 10,
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    backgroundColor: COLORS.background,
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

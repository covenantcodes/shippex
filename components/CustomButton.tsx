import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomButtonProps {
  width?: string | number;
  height?: number;
  title: string;
  color?: string;
  icon?: string;
  image?: any;
  textColor?: string;
  borderColor?: string;
  onPress: () => void;
  style?: any;
  fontSize?: number;
  fontFamily?: string;
  disabled?: boolean;
  loading?: boolean; // Add loading prop
}

const CustomButton: React.FC<CustomButtonProps> = ({
  width,
  height,
  title,
  color,
  icon,
  image,
  textColor,
  borderColor,
  onPress,
  style,
  fontSize = 16,
  fontFamily = "PoppinsBold",
  disabled = false,
  loading = false, // Default loading to false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width,
          backgroundColor: disabled || loading ? "#EAE7F2" : color,
          borderColor:
            borderColor || (disabled ? "transparent" : "transparent"),
          borderWidth: borderColor || disabled ? 1 : 0,
          height: height || 50,
        },
        style,
      ]}
      onPress={!disabled && !loading ? onPress : undefined}
      activeOpacity={disabled || loading ? 1 : 0.7} // Disable opacity when loading/disabled
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={textColor || "#fff"} /> // Show loading spinner
        ) : (
          <>
            {icon && (
              <Ionicons
                name={icon}
                size={24}
                color={disabled ? "#a9a9a9" : "white"}
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.title,
                {
                  color: disabled ? "#A7A3B3" : textColor || "#fff",
                  fontSize,
                  fontFamily,
                },
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default CustomButton;

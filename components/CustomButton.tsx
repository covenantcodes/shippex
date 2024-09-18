import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
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
  disabled?: boolean; // Add disabled prop
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
  disabled = false, // Default to false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width,
          backgroundColor: disabled ? "#EAE7F2" : color, // Change background when disabled
          borderColor:
            borderColor || (disabled ? "transparent" : "transparent"),
          borderWidth: borderColor || disabled ? 1 : 0,
          height: height || 50,
        },
        style,
      ]}
      onPress={!disabled ? onPress : undefined} // Disable onPress when button is disabled
      activeOpacity={disabled ? 1 : 0.7} // Disable opacity effect when disabled
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color={disabled ? "#a9a9a9" : "white"}
            style={styles.icon}
          />
        )}
        {image && <Image source={image} style={styles.image} />}
        <Text
          style={[
            styles.title,
            {
              color: disabled ? "#A7A3B3" : textColor || "#fff", // Change text color when disabled
              fontSize,
              fontFamily, // Set fontFamily dynamically
            },
          ]}
        >
          {title}
        </Text>
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
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default CustomButton;

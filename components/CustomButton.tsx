import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomButtonProps {
  width?: number | string;
  height?: number;
  title: string;
  color?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  image?: ImageSourcePropType;
  textColor?: string;
  borderColor?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
  fontFamily?: string;
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
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: width as any, // Type assertion to avoid width type error
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: borderColor ? 1 : 0,
          height: height || 50,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons name={icon} size={24} color="white" style={styles.icon} />
        )}
        {image && <Image source={image} style={styles.image} />}
        <Text
          style={[styles.title, { color: textColor, fontSize, fontFamily }]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
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
  title: {},
});

export default CustomButton;

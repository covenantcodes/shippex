import React, { useEffect, useRef, useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigationTypes";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ExpoSplashScreen from "expo-splash-screen";
import UpperLogoPart from "../../svg/UpperLogoPart";
import LowerLogoPart from "../../svg/LowerLogoPart";
import COLORS from "../../configs/color";

const { height, width } = Dimensions.get("window");
const inchToPixel = 96;
const offset = 0.3 * inchToPixel;

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SplashScreen"
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const logoScale = useRef(new Animated.Value(0)).current;
  const upperPartTranslateY = useRef(new Animated.Value(-offset)).current;
  const upperPartTranslateX = useRef(new Animated.Value(0)).current;
  const lowerPartTranslateY = useRef(new Animated.Value(offset)).current;
  const lowerPartTranslateX = useRef(new Animated.Value(0)).current;
  const blueWipeTranslateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    // Prevent the native splash screen from auto-hiding
    ExpoSplashScreen.preventAutoHideAsync();
  }, []);

  const onAnimationComplete = useCallback(async () => {
    await ExpoSplashScreen.hideAsync();
    navigation.replace("Auth");
  }, [navigation]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(upperPartTranslateY, {
          toValue: -height * 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(upperPartTranslateX, {
          toValue: width,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(lowerPartTranslateY, {
          toValue: -height * 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(lowerPartTranslateX, {
          toValue: -width * 0.5,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(blueWipeTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(onAnimationComplete);
  }, [
    logoScale,
    upperPartTranslateY,
    upperPartTranslateX,
    lowerPartTranslateY,
    lowerPartTranslateX,
    blueWipeTranslateY,
    onAnimationComplete,
  ]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoPart,
            {
              transform: [
                { translateY: upperPartTranslateY },
                { translateX: upperPartTranslateX },
              ],
            },
          ]}
        >
          <UpperLogoPart />
        </Animated.View>
        <Animated.View
          style={[
            styles.logoPart,
            {
              transform: [
                { translateY: lowerPartTranslateY },
                { translateX: lowerPartTranslateX },
              ],
            },
          ]}
        >
          <LowerLogoPart />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.blueWipe,
          { transform: [{ translateY: blueWipeTranslateY }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    position: "absolute",
    alignItems: "center",
  },
  logoPart: {
    position: "absolute",
  },
  blueWipe: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: COLORS.primaryColor,
    bottom: 0,
  },
});

export default SplashScreen;

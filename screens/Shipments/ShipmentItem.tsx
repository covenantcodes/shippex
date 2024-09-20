import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import COLORS from "../../configs/color";
import images from "../../configs/images";

interface ShipmentItemProps {
  awb: string;
  origin: string;
  originDetails: string;
  destination: string;
  destinationDetails: string;
  status: "RECEIVED" | "CANCELED" | "ON HOLD" | "ERROR" | "DELIVERED";
  icon: any;
}

const ShipmentItem: React.FC<ShipmentItemProps> = ({
  awb,
  origin,
  originDetails,
  destination,
  destinationDetails,
  status,
  icon,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const getStatusColor = () => {
    switch (status) {
      case "RECEIVED":
        return COLORS.received;
      case "CANCELED":
        return COLORS.canceled;
      case "ON HOLD":
        return COLORS.onHold;
      case "ERROR":
        return COLORS.error;
      case "DELIVERED":
        return COLORS.delivered;
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case "RECEIVED":
        return COLORS.receivedText;
      case "CANCELED":
        return COLORS.canceledText;
      case "ON HOLD":
        return COLORS.onHoldText;
      case "ERROR":
        return COLORS.errorText;
      case "DELIVERED":
        return COLORS.deliveredText;
    }
  };

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // Adjust this value based on your content
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.leftContainer}>
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={20}
            color={"#D0D5DD"}
          />
          <Image source={images.BoxIcon} style={styles.shipmentIcon} />
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.awbHeaderText}>AWB</Text>
          <Text style={styles.awbText}>{awb}</Text>
          <Text style={styles.routeText}>
            {origin} <Text style={styles.arrowText}> ➔ </Text> {destination}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <View
            style={[
              styles.statusContainer,
              { backgroundColor: getStatusColor() },
            ]}
          >
            <Text style={[styles.statusText, { color: getStatusTextColor() }]}>
              {status}
            </Text>
          </View>

          <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
            <AntDesign
              name={"arrowsalt"}
              size={20}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[
          styles.expandedContent,
          {
            height: heightInterpolation,
            borderTopWidth: expanded ? 3 : 0,
            borderStyle: "dashed",
            borderColor: expanded ? "white" : "transparent",
          },
        ]}
      >
        <View style={styles.detailsContainer}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailHeader}>Origin</Text>
            <Text style={styles.detailLocation}>{origin}</Text>
            <Text style={styles.detailAddress}>{originDetails}</Text>
          </View>

          <View>
            <AntDesign
              name="arrowright"
              color={COLORS.primaryColor}
              size={18}
            />
          </View>

          <View style={styles.detailColumn}>
            <Text style={styles.detailHeader}>Destination</Text>
            <Text style={styles.detailLocation}>{destination}</Text>
            <Text style={styles.detailAddress}>{destinationDetails}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whatsappButton}>
            <Image
              source={images.whatsappIcon}
              style={{ width: 23, height: 23 }}
            />
            <Text style={styles.actionButtonText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  leftContainer: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center",
  },
  shipmentIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  middleContainer: {
    width: "50%",
    flex: 1,
    paddingHorizontal: 10,
  },
  awbHeaderText: {
    fontSize: 16,
    fontFamily: "PoppinsLight",
    color: COLORS.black,
  },
  awbText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: COLORS.black,
  },
  routeText: {
    fontSize: 14,
    fontFamily: "PoppinsLight",
    color: COLORS.grey,
  },
  arrowText: {
    color: COLORS.primaryColor,
  },
  rightContainer: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },
  expandButton: {
    padding: 6,
    borderRadius: 25,
    marginLeft: 10,
    backgroundColor: COLORS.white,
  },
  expandedContent: {
    backgroundColor: COLORS.background,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  detailColumn: {},
  detailHeader: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: COLORS.primaryColor,
  },
  detailLocation: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: COLORS.black,
  },
  detailAddress: {
    fontSize: 14,
    fontFamily: "PoppinsLight",
    color: COLORS.grey,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-end",
    paddingBottom: 25,
    paddingRight: 15,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondaryPlaceHolderColor,
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whatsappGreen,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  actionButtonText: {
    color: COLORS.white,
    marginLeft: 5,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});

export default ShipmentItem;

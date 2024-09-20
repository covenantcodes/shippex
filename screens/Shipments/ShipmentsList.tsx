import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../configs/color";
import { shipments } from "../../configs/tempData";
import ShipmentItem from "./ShipmentItem";

const ShipmentsList: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shipments</Text>

        <View style={styles.markContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={20}
              color={"#D0D5DD"}
            />
          </TouchableOpacity>
          <Text style={styles.markText}>Mark All</Text>
        </View>
      </View>

      <FlatList
        data={shipments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShipmentItem
            awb={item.awb}
            origin={item.origin}
            destination={item.destination}
            destinationDetails={item.destinationDetails}
            originDetails={item.originDetails}
            status={item.status}
            icon={item.icon}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    color: COLORS.black,
  },
  markContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  markText: {
    marginLeft: 5,
    color: COLORS.primaryColor,
    fontFamily: "PoppinsRegular",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default ShipmentsList;

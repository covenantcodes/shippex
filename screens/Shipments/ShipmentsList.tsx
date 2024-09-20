import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../configs/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShipmentItem from "./ShipmentItem";
import { fetchShipmentStatusList } from "../../services/apiServices";

const ShipmentsList: React.FC = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchShipmentStatusList();
      setShipments(response.data.message); // Assuming the response has "message" with shipment data
      setLoading(false);
    } catch (err) {
      setError("Failed to load shipments");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ShipmentItem
            awb={item.awb || "41785691423"}
            origin={item.origin || "Cairo"}
            destination={item.destination || "Alexandria"}
            destinationDetails={item.destinationDetails || "Smoha, 22 max St."}
            originDetails={item.originDetails || "Dokki, 22 Nile St."}
            status={item.status || "Nil"}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
  },
});

export default ShipmentsList;

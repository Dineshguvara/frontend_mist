import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const SchoolCard = ({ school, onPress }) => {
  // Replace localhost with your local IP address if needed
  const imageUrl = school.imageUrl
    ? school.imageUrl.replace("localhost", "192.168.1.9")
    : "https://via.placeholder.com/150";

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(school)}>
      <Image
        source={{ uri: imageUrl || "https://via.placeholder.com/150" }}
        style={styles.image}
        onError={(e) =>
          console.log("Image load error for SchoolCard:", e.nativeEvent.error)
        }
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{school.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    margin: 8,
    flex: 1,
    maxWidth: "48%",
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
  },
  cardContent: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardText: { fontSize: 14, color: "#555" },
});

export default SchoolCard;

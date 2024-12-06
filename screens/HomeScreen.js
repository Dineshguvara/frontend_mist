import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";
import LogoutButton from "../component/auth/Logout";
function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      <RNButton
        title="Go to Profile"
        onPress={() => navigation.navigate("Details")}
      />
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;

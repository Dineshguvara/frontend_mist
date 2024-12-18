import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";
import LogoutButton from "../../component/auth/Logout";

function SuperAdminDashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Super admin Dashboard</Text>
      <RNButton
        title="Go to Profile"
        onPress={() => navigation.navigate("Details")}
      />

      <RNButton
        title="Go to  list"
        onPress={() => navigation.navigate("DataList")}
      />
      <RNButton
        title="Go to upload"
        onPress={() => navigation.navigate("UploadFile")}
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

export default SuperAdminDashboardScreen;

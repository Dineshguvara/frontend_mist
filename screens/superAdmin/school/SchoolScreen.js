import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SchoolList from "./SchoolList"; // Import SchoolList component
import { useGetAllSchoolsQuery } from "../../../redux/services/schoolsApi";

const MainSchoolScreen = ({ navigation }) => {
  const { data: schools, isLoading, refetch } = useGetAllSchoolsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Refetch schools whenever the screen is focused
      refetch();
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation, refetch]);

  const navigateToSchoolForm = () => {
    navigation.navigate("SchoolStack", {
      screen: "CreateSchool",
    });
  };

  const navigateToSchoolDetail = (schoolId) => {
    navigation.navigate("SchoolStack", {
      screen: "SchoolDetail",
      params: { schoolId },
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search schools..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* School List */}
      <SchoolList
        searchQuery={searchQuery}
        schools={schools}
        isLoading={isLoading}
        navigateToSchoolDetail={navigateToSchoolDetail}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={navigateToSchoolForm}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200ee",
  },
});

export default MainSchoolScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useShowAllSchoolsQuery } from "../../../../redux/services/schoolsApi";
import SchoolCard from "../../../superAdmin/school/SchoolCard";

const SchoolSelectScreen = () => {
  const { data: schools, isLoading, error } = useShowAllSchoolsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  const filteredSchools =
    schools?.filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSelectSchool = (school) => {
    navigation.navigate("RegisterForm", {
      schoolId: school.id,
      roleId: 3, // Default roleId for Student
    });
  };

  if (isLoading) return <Text style={styles.loading}>Loading schools...</Text>;

  if (error) {
    return (
      <Text style={styles.error}>Failed to load schools. Try again later.</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your School</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for your school..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SchoolCard school={item} onPress={handleSelectSchool} />
        )}
        numColumns={2} // For a grid layout
        columnWrapperStyle={styles.row} // Style for row
        ListEmptyComponent={
          <Text style={styles.noSchools}>No schools found</Text>
        }
      />
      {/* Link back to LoginScreen */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  schoolImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
  },
  schoolName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  loading: { fontSize: 16, textAlign: "center" },
  noSchools: { fontSize: 16, textAlign: "center", marginTop: 20 },
  link: { marginTop: 20, alignSelf: "center" },
  linkText: { color: "#6200ee", textDecorationLine: "underline" },
});

export default SchoolSelectScreen;

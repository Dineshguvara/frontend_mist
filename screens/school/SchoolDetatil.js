import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useGetSchoolByIdQuery } from "../../redux/services/schoolsApi";
import { useDeleteSchoolHandler } from "./DeleteSchool";
import InvitationModal from "../../component/auth/InvitationModal";

const SchoolDetailScreen = ({ route, navigation }) => {
  const { schoolId } = route.params;

  const roles = [
    { id: "1", name: "Admin" },
    { id: "2", name: "Principal" },
    { id: "4", name: "Teacher" },
    { id: "3", name: "Student" },
  ];

  // Fetch school details using schoolId
  const { data: school, isLoading, isError } = useGetSchoolByIdQuery(schoolId);
  const { handleDelete, isDeleting } = useDeleteSchoolHandler(navigation);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    navigation.navigate("SchoolStack", {
      screen: "EditSchool", // Target screen in SchoolStack
      params: { schoolId }, // Pass parameters
    });
  };

  const handleSaveInvite = ({ schoolId, roleId }) => {
    console.log("School ID:", schoolId, "Role ID:", roleId);

    // Add your API call or other logic here
    Alert.alert(
      "Success",
      `Invitation sent to role ID: ${roleId} for School ID: ${schoolId}`
    );
  };

  const resolveImageUrl = (url) => {
    if (!url) {
      return "https://via.placeholder.com/300"; // Placeholder for missing images
    }

    if (url.startsWith("http") || url.startsWith("https")) {
      return url; // Full URL
    }

    if (url.startsWith("/")) {
      // Relative path, prepend with server IP
      return `http://192.168.1.9:3000${url}`;
    }

    return url; // Fallback to whatever is provided
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Loading school details...</Text>
      </View>
    );
  }

  if (isError || !school) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load school details. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* School Image */}
      <Image
        source={{
          uri: resolveImageUrl(school.imageUrl),
        }}
        style={styles.schoolImage}
      />

      {/* School Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.schoolName}>{school.name}</Text>
        <Text style={styles.schoolField}>
          <Text style={styles.fieldTitle}>Address:</Text> {school.address}
        </Text>
        <Text style={styles.schoolField}>
          <Text style={styles.fieldTitle}>Contact:</Text> {school.contact}
        </Text>
        <Text style={styles.schoolField}>
          <Text style={styles.fieldTitle}>Email:</Text> {school.email}
        </Text>
        <Text style={styles.schoolField}>
          <Text style={styles.fieldTitle}>Principal:</Text> {school.principal}
        </Text>
        <Text style={styles.schoolField}>
          <Text style={styles.fieldTitle}>Established:</Text>{" "}
          {school.establishedYear}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {/* EDIT BUTTON */}
        <Button title="Edit School" onPress={handleEdit} color="#6200ee" />
        <View style={styles.buttonSpacing} />
        {/* DELTE BUTTON */}
        <Button
          title={isDeleting ? "Deleting..." : "Delete School"}
          onPress={() => handleDelete(schoolId)}
          color="red"
          disabled={isDeleting}
        />
        <View style={styles.buttonSpacing} />
        <Button title="Invite" onPress={() => setModalVisible(true)} />
      </View>
      <InvitationModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveInvite}
        roles={roles}
        schoolId={schoolId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  schoolImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  schoolField: {
    fontSize: 16,
    marginBottom: 8,
  },
  fieldTitle: {
    fontWeight: "bold",
  },
  actionContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
  },
  buttonSpacing: {
    height: 10,
  },
});

export default SchoolDetailScreen;

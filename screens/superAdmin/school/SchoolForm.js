// SchoolForm.js (Reusable Component)

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const SchoolForm = ({ schoolData, onSubmit, isEditMode }) => {
  const [formData, setFormData] = useState({
    name: schoolData?.name || "",
    address: schoolData?.address || "",
    image: schoolData?.imageUrl || null,
  });

  // Update the form state when schoolData changes
  useEffect(() => {
    if (schoolData) {
      setFormData({
        name: schoolData.name,
        address: schoolData.address,
        image: schoolData.imageUrl,
      });
    }
  }, [schoolData]);

  // Handle dynamic form field changes
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle image selection with permission logic
  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Camera roll access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri); // Save the image URI in formData
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      Alert.alert("Validation Error", "School name is required!");
      return;
    }

    const form = new FormData();

    // Append fields to FormData
    form.append("name", formData.name);
    if (formData.address) {
      form.append("address", formData.address);
    }
    if (formData.image) {
      const imageFile = {
        uri: formData.image,
        type: "image/jpeg",
        name: "school-image.jpg",
      };
      form.append("file", imageFile);
    }

    try {
      // Call the parent onSubmit function to handle form submission
      await onSubmit(form);
      // Alert.alert(
      //   "Success",
      //   `${isEditMode ? "School updated" : "School created"} successfully!`
      // );
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        `Failed to ${isEditMode ? "update" : "create"} school.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? "Edit School" : "Create a New School"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="School Name"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Address (Optional)"
        value={formData.address}
        onChangeText={(text) => handleChange("address", text)}
      />

      {formData.image && (
        <Image source={{ uri: formData.image }} style={styles.imagePreview} />
      )}
      <Button title="Pick Image" onPress={handleImagePick} />

      <Button
        title={isEditMode ? "Update School" : "Submit Form"}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
});

export default SchoolForm;

// EditSchoolScreen.js (for Edit School)

import React, { useEffect } from "react";
import {
  useGetSchoolByIdQuery,
  useUpdateSchoolMutation,
} from "../../redux/services/schoolsApi";
import SchoolForm from "./SchoolForm";

const EditSchoolScreen = ({ route, navigation }) => {
  const { schoolId } = route.params;

  // Fetch school details by ID
  const { data: school, isLoading } = useGetSchoolByIdQuery(schoolId);
  const [updateSchool] = useUpdateSchoolMutation();

  const resolveImageUrl = (url) => {
    if (!url) {
      return "https://via.placeholder.com/300"; // Placeholder for missing images
    }

    if (url.startsWith("http") || url.startsWith("https")) {
      return url; // Full URL
    }

    if (url.startsWith("/")) {
      return `http://192.168.63.86:3000${url}`; // Adjust base URL to match your backend
    }

    return url;
  };

  useEffect(() => {
    if (!isLoading && !school) {
      navigation.goBack(); // Go back if school is not found
    }
  }, [isLoading, school, navigation]);

  // Handle update school submission
  const handleUpdateSchool = async (formData) => {
    try {
      const response = await updateSchool({ id: schoolId, formData }).unwrap();
      console.log("School Updated:", response);
      navigation.goBack(); // Navigate back after successful update
    } catch (error) {
      console.error("Error updating school:", error);
    }
  };

  return !isLoading && school ? (
    <SchoolForm
      schoolData={{
        ...school,
        imageUrl: resolveImageUrl(school.imageUrl),
      }}
      onSubmit={handleUpdateSchool}
      isEditMode={true}
    />
  ) : (
    <Text>Loading...</Text>
  );
};

export default EditSchoolScreen;

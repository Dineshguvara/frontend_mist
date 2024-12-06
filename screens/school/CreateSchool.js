import React from "react";
import { useCreateSchoolMutation } from "../../redux/services/schoolsApi";
import SchoolForm from "./SchoolForm";

const CreateSchoolScreen = ({ navigation }) => {
  const [createSchool] = useCreateSchoolMutation();

  // Handle create school submission
  const handleCreateSchool = async (formData) => {
    try {
      const response = await createSchool(formData).unwrap();
      console.log("School Created:", response);
      navigation.goBack(); // Navigate back after successful creation
    } catch (error) {
      console.error("Error creating school:", error);
    }
  };

  return <SchoolForm schoolData={null} onSubmit={handleCreateSchool} isEditMode={false} />;
};

export default CreateSchoolScreen;

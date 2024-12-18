// EditSchoolScreen.js (for Edit School)

import React, { useEffect } from "react";
import {
  useGetSchoolByIdQuery,
  useUpdateSchoolMutation,
} from "../../../redux/services/schoolsApi";
import SchoolForm from "./SchoolForm";
import resolveImageUrl from "../../auth/helperScreens/image/resolveImageUrl";

const EditSchoolScreen = ({ route, navigation }) => {
  const { schoolId } = route.params;

  // Fetch school details by ID
  const { data: school, isLoading } = useGetSchoolByIdQuery(schoolId);
  const [updateSchool] = useUpdateSchoolMutation();

 

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

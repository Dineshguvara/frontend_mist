import { Alert } from "react-native";
import { useDeleteSchoolMutation } from "../../../redux/services/schoolsApi";

export const useDeleteSchoolHandler = (navigation) => {
  const [deleteSchool, { isLoading: isDeleting }] = useDeleteSchoolMutation();

  const handleDelete = async (schoolId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this school?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSchool(schoolId).unwrap();
              // Alert.alert("Success", "School deleted successfully!");
              navigation.goBack(); // Navigate back after deletion
            } catch (error) {
              console.error("Delete failed:", error);
              Alert.alert(
                "Error",
                "Failed to delete the school. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return { handleDelete, isDeleting };
};

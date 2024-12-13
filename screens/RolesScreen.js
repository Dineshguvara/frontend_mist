import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import {
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "../redux/services/rolesApi";

function RolesScreen() {
  const { data: roles, isLoading, refetch } = useGetAllRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState(null); // Used to store role details during edit
  const [roleName, setRoleName] = useState("");

  // Open modal for creating a new role
  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentRole(null);
    setRoleName("");
    setModalVisible(true);
  };

  // Open modal for editing a role
  const openEditModal = (role) => {
    setIsEditMode(true);
    setCurrentRole(role);
    setRoleName(role.name);
    setModalVisible(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Update Role
        await updateRole({
          id: currentRole.id,
          updatedRole: { name: roleName },
        });
        // Alert.alert("Success", "Role updated successfully");
      } else {
        // Create Role
        await createRole({ name: roleName });
        // Alert.alert("Success", "Role created successfully");
      }
      refetch(); // Refresh the roles list
      setModalVisible(false);
    } catch (error) {
      console.error("Error submitting role:", error);
      Alert.alert("Error", "Failed to submit the role");
    }
  };

  // Handle role deletion
  const handleDeleteRole = async (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this role?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteRole(id);
              refetch();
              // Alert.alert("Success", "Role deleted successfully");  
            } catch (error) {
              console.error("Error deleting role:", error);
              Alert.alert("Error", "Failed to delete the role");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteRole(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No roles found</Text>}
      />

      {/* Create Button */}
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
        <Text style={styles.createButtonText}>+ Create Role</Text>
      </TouchableOpacity>

      {/* Modal for Create/Edit */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditMode ? "Edit Role" : "Create Role"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Role Name"
              value={roleName}
              onChangeText={setRoleName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default RolesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowText: {
    fontSize: 16,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 8,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  createButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

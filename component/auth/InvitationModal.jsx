import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Correct import

const InvitationModal = ({ isVisible, onClose, onSave, roles, schoolId }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSave = () => {
    if (!selectedRole) {
      Alert.alert(
        "Error",
        "Please select a role before sending an invitation."
      );
      return;
    }

    // Pass the data back to the parent component
    onSave({ schoolId, roleId: selectedRole });
    onClose(); // Close the modal
  };

  useEffect(() => {
    if (!isVisible) {
      setSelectedRole(null); // Reset state when modal is closed
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Invite to School</Text>
          <Text style={styles.fieldLabel}>Select Role</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedRole}
              onValueChange={(itemValue) => setSelectedRole(itemValue)}
            >
              <Picker.Item label="Select a role" value={null} />
              {roles.map((role) => (
                <Picker.Item label={role.name} value={role.id} key={role.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16, // Rounded corners
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#333", // Neutral dark text
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#555", // Subtle text color
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden", // Ensures picker stays within rounded border
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0", // Light gray for cancel
  },
  saveButton: {
    backgroundColor: "#6200ee", // Purple for save
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default InvitationModal;

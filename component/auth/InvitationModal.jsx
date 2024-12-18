import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useInviteUserMutation } from "../../redux/services/auth_service/authApi";

const InvitationModal = ({ isVisible, onClose, onSave, roles, schoolId }) => {
  const [formData, setFormData] = useState({
    email: "",
    selectedRole: null,
  });

  // RTK Query mutation
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const handleInputChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const { email, selectedRole } = formData;

    if (!selectedRole) {
      Alert.alert(
        "Error",
        "Please select a role before sending an invitation."
      );
      return;
    }

    if (!email) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      await inviteUser({
        roleId: selectedRole,
        schoolId,
        toEmail: email,
      }).unwrap();

      Alert.alert("Success", "Invitation sent successfully.");
      onClose(); // Close the modal
    } catch (err) {
      Alert.alert("Error", "Failed to send invitation. Please try again.");
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setFormData({
        email: "",
        selectedRole: null,
      });
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Invite to School</Text>
          <Text style={styles.fieldLabel}>Recipient Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter recipient email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.fieldLabel}>Select Role</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.selectedRole}
              onValueChange={(value) =>
                handleInputChange("selectedRole", value)
              }
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#555",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
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
    backgroundColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#6200ee",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default InvitationModal;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useUploadFileMutation } from "../redux/services/dummyApi";
import { MaterialIcons } from "@expo/vector-icons";

function UploadFileScreen() {
  const [file, setFile] = useState(null);
  const [uploadFile, { isLoading, error, data }] = useUploadFileMutation();

  const handleFileChange = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
        copyToCacheDirectory: true,
      });

      console.log("Document Picker Result:", result);

      if (!result.canceled && result.assets?.length > 0) {
        const selectedFile = result.assets[0]; // Access the first file in assets array

        setFile({
          uri: selectedFile.uri.startsWith("file://")
            ? selectedFile.uri
            : `file://${selectedFile.uri}`, // Ensure the URI has the correct format
          name: selectedFile.name || "unknown_file.xlsx",
          type: selectedFile.mimeType || "application/octet-stream",
          size: selectedFile.size || 0,
        });

        console.log("File Selected:", selectedFile);
      } else {
        console.log("File selection canceled or invalid.");
      }
    } catch (err) {
      console.error("File selection failed:", err);
    }
  };

  const normalizeFilePath = (uri) => {
    // Normalize the URI for Android to remove the "file://" prefix if required
    if (Platform.OS === "android" && uri.startsWith("file://")) {
      return uri.replace("file://", "");
    }
    return uri;
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        console.log("FormData before appending:", formData);

        formData.append("file", {
          uri: normalizeFilePath(file.uri),
          //  uri: `file://${file.uri}`
          name: file.name,
          type: file.type,
        });

        console.log("Normalized File URI:", normalizeFilePath(file.uri));
        console.log("FormData after appending:", JSON.stringify(formData));

        // Make the API call to upload the file
        const response = await uploadFile(formData).unwrap();

        console.log("Upload success:", response);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload File</Text>

      {/* File Picker */}
      <TouchableOpacity onPress={handleFileChange} style={styles.filePicker}>
        <MaterialIcons name="attach-file" size={24} color="#007BFF" />
        <Text style={styles.filePickerText}>
          {file ? "Change File" : "Choose a File"}
        </Text>
      </TouchableOpacity>

      {/* File Preview Section */}
      {file && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>File Preview:</Text>
          <View style={styles.previewDetails}>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Name:</Text> {file.name}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Size:</Text>{" "}
              {`${(file.size / 1024).toFixed(2)} KB`}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Type:</Text> {file.type}
            </Text>
          </View>
        </View>
      )}

      {/* Upload Button */}
      <TouchableOpacity
        style={[
          styles.uploadButton,
          isLoading || !file ? styles.disabledButton : null,
        ]}
        onPress={handleUpload}
        disabled={isLoading || !file}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Upload File</Text>
        )}
      </TouchableOpacity>

      {/* Error/Success Messages */}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      {data && <Text style={styles.successText}>{data.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  filePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F0FE",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  filePickerText: {
    marginLeft: 10,
    color: "#007BFF",
    fontSize: 16,
  },
  previewContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderColor: "#D1D1D1",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  previewDetails: {
    marginLeft: 5,
  },
  previewText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  previewLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
});

export default UploadFileScreen;

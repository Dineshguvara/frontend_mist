import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRegisterMutation } from "../../redux/services/auth_service/authApi";
import resolveImageUrl from "./helperScreens/image/resolveImageUrl";
import { useShowRoleByIdQuery } from "../../redux/services/rolesApi";
import { useShowSchoolByIdQuery } from "../../redux/services/schoolsApi";
import jwtDecode from "jwt-decode";
import { Ionicons } from "@expo/vector-icons";
// import { useGenerateRegistrationOtpMutation } from "../../redux/services/auth_service/authApi";

const RegistrationFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tokenData } = route.params || {};
  const { schoolId: routeSchoolId, roleId: routeRoleId } = route.params || {};
  const [schoolId, setSchoolId] = useState(routeSchoolId || null);
  const [roleId, setRoleId] = useState(routeRoleId || null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    data: school,
    isLoading: isSchoolLoading,
    isError: isSchoolError,
  } = useShowSchoolByIdQuery(schoolId, { skip: !schoolId });
  const {
    data: role,
    isLoading: isRoleLoading,
    isError: isRoleError,
  } = useShowRoleByIdQuery(roleId, { skip: !roleId });

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  useEffect(() => {
    if (tokenData) {
      try {
        const decodedToken = jwtDecode(tokenData);
        setSchoolId(decodedToken.schoolId);
        setRoleId(decodedToken.roleId);
      } catch (error) {
        console.error("Invalid token format:", error);
        Alert.alert("Error", "Failed to decode token.");
      }
    }
  }, [tokenData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        schoolId,
        roleId,
      }).unwrap();
      Alert.alert("Success", "Registration successful!");
    } catch (error) {
      console.error("Registration error:", error); // Debug the error object

      // Safely extract error message
      let errorMessage = "Failed to  Register Your Data.";
      if (error?.data?.message) {
        errorMessage =
          typeof error.data.message === "string"
            ? error.data.message
            : JSON.stringify(error.data.message); // Fallback to stringify
      }

      Alert.alert("Error", errorMessage);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       name: formData.name,
  //       email: formData.email,
  //       password: formData.password,
  //       schoolId: Number(schoolId),
  //       roleId: Number(roleId),
  //     };

  //     console.log("Payload being sent:", payload); // Debugging

  //     await register(payload).unwrap(); // API to send OTp

  //     navigation.navigate("VerifyOtp", {
  //       email: formData.email,
  //       formData: {
  //         ...formData,
  //         schoolId: Number(schoolId),
  //         roleId: Number(roleId),
  //       },
  //       purpose: "REGISTRATION",
  //     });
  //   } catch (error) {
  //     console.error("Registration error:", error); // Debug the error object

  //     // Safely extract error message
  //     let errorMessage = "Failed to send OTP.";
  //     if (error?.data?.message) {
  //       errorMessage =
  //         typeof error.data.message === "string"
  //           ? error.data.message
  //           : JSON.stringify(error.data.message); // Fallback to stringify
  //     }

  //     Alert.alert("Error", errorMessage);
  //   }
  // };

  if (isSchoolLoading || isRoleLoading) {
    return <Text style={styles.loading}>Loading registration details...</Text>;
  }

  if (isSchoolError || isRoleError || !school || !role) {
    return (
      <Text style={styles.error}>
        Failed to load registration details. Please try again.
      </Text>
    );
  }

  const roleName = role.name;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: resolveImageUrl(school.imageUrl) }}
          style={styles.schoolImage}
        />
        <Text style={styles.title}>Register for {school.name}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`${roleName} Name`}
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={25}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={25}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isRegisterLoading}
        >
          <Text style={styles.buttonText}>
            {isRegisterLoading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContent: { padding: 20 },
  schoolImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: { marginTop: 20, alignSelf: "center" },
  linkText: { color: "#6200ee", textDecorationLine: "underline" },
  loading: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
  },
  error: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#ff3333",
  },
});

export default RegistrationFormScreen;

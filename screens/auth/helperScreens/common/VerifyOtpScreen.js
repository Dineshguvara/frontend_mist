import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useVerifyRegistrationOtpMutation,
  useResendRegistrationOtpMutation,
} from "../../../../redux/services/auth_service/authApi";
import {
  useVerifyForgetPasswordOtpMutation,
  useResendForgetPasswordOtpMutation,
} from "../../../../redux/services/auth_service/forgetPasswordApi";

const VerifyOtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { email, formData, purpose } = route.params;
  console.log("from verify otp screen ", route.params);

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(90); // 10 minutes

  // Define mutation hooks with isLoading state
  const [
    registerVerifyOtp,
    { isLoading: isRegistering }, // Get isLoading state for registration OTP verification
  ] = useVerifyRegistrationOtpMutation();

  const [
    forgetPasswordVerifyOtp,
    { isLoading: isVerifyingFP }, // Get isLoading state for forget-password OTP verification
  ] = useVerifyForgetPasswordOtpMutation();

  const [
    resendRegisterOtp,
    { isLoading: isResendingRegister }, // Get isLoading state for registration OTP resend
  ] = useResendRegistrationOtpMutation();

  const [
    resendFPOtp,
    { isLoading: isResendingFP }, // Get isLoading state for forget-password OTP resend
  ] = useResendForgetPasswordOtpMutation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerifyOtp = async () => {
    try {
      if (purpose === "REGISTRATION") {
        // For registration, call the completeRegistration endpoint
        const response = await registerVerifyOtp({
          email,
          otp,
          userDto: {
            ...formData,
            schoolId: formData.schoolId,
            roleId: formData.roleId,
            purpose: purpose,
          },
        }).unwrap();
        console.log("Registration completed. Details of new user:", response);
        Alert.alert("Success", "Registration completed!");
        navigation.navigate("Login");
      } else if (purpose === "FORGET_PASSWORD") {
        const dto = { email, otp, purpose: purpose };
        const response = await forgetPasswordVerifyOtp(dto).unwrap();
        console.log("Password reset OTP verified successfully:", response);
        Alert.alert(
          "Success",
          "OTP verified successfully! Proceed to reset your password."
        );
        navigation.navigate("NewPassword", { email }); // Navigate to password reset screen
      } else {
        throw new Error("Invalid purpose");
      }
    } catch (error) {
      Alert.alert("Error", error?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      const dto = { email, purpose };

      // Determine the appropriate endpoint based on the purpose
      if (purpose === "REGISTRATION") {
        await resendRegisterOtp(dto).unwrap();
      } else if (purpose === "FORGET_PASSWORD") {
        await resendFPOtp(dto).unwrap();
      } else {
        throw new Error("Invalid purpose");
      }

      setTimeLeft(90); // Reset the timer
      Alert.alert("Success", "OTP resent successfully!");
    } catch (error) {
      console.error("Error in resending OTP:", error);

      // Safely extract the error message
      let errorMessage = "Failed to resend OTP.";
      if (error?.data?.message) {
        errorMessage =
          typeof error.data.message === "string"
            ? error.data.message
            : JSON.stringify(error.data.message); // Fallback to stringify
      }
      Alert.alert("Error", errorMessage);
    }
  };

  // Determine the current loading states based on purpose
  const isSubmitting =
    purpose === "REGISTRATION" ? isRegistering : isVerifyingFP;
  const isResending =
    purpose === "REGISTRATION" ? isResendingRegister : isResendingFP;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.description}>
        Enter the 6-digit OTP sent to your email address: {email}
      </Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
      />
      {timeLeft > 0 ? (
        <Text style={styles.timer}>
          Time left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </Text>
      ) : isResending ? ( // Show spinner while resending
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
        onPress={handleVerifyOtp}
        disabled={isSubmitting || otp.length !== 6}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  timer: {
    fontSize: 14,
    color: "#ff6347",
    textAlign: "center",
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#007bff",
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyOtpScreen;

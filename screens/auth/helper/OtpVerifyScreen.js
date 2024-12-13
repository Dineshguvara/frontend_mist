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
  useCompleteRegistrationMutation,
  useResendOtpMutation,
} from "../../../redux/services/authApi";

const OtpVerifyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { email, formData, schoolId, roleId } = route.params;
  console.log("from verify otp screen ", route.params);

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyOtp] = useCompleteRegistrationMutation();
  const [resendOtp] = useResendOtpMutation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    try {
      const response = await verifyOtp({
        email,
        otp,
        userDto: {
          ...formData,
          schoolId: formData.schoolId,
          roleId: formData.roleId,
        },
      }).unwrap();
      console.log("registraion completed. details of new user ", response);

      Alert.alert("Success", "Registration completed!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error?.data?.message || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email }).unwrap();
      setTimeLeft(600); // Reset the timer
      Alert.alert("Success", "OTP resent successfully!");
    } catch (error) {
      Alert.alert("Error", error?.data?.message || "Failed to resend OTP");
    }
  };

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

export default OtpVerifyScreen;

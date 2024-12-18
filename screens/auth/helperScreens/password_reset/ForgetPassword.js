import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGenerateForgetPasswordOtpMutation } from "../../../../redux/services/auth_service/forgetPasswordApi";

const ForgotPasswordScreen = () => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [generateOtp, { isLoading }] = useGenerateForgetPasswordOtpMutation();
  const navigation = useNavigation();

  const { purpose } = route.params;
  console.log("from forget password screen purose data checking ", purpose);

  const handleSendOtp = async () => {
    if (!email) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Construct the DTO with email and purpose
      const dto = { email, purpose };
      console.log("from forget password screen", dto);

      // Call the mutation with the DTO
     const response = await generateOtp(dto).unwrap();

      console.log("from forget password screen after sending to API ", response);

      // Navigate to the VerifyOtp screen with email and purpose
      navigation.navigate("VerifyOtp", { email, purpose });
    } catch (error) {
      // Handle the error and display an error message
      setErrorMessage(error.data?.message || "Error sending OTP. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title={isLoading ? "Sending OTP..." : "Send OTP"}
        onPress={handleSendOtp}
        disabled={isLoading}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateForgetPasswordMutation } from "../../../../redux/services/auth_service/forgetPasswordApi";
import { useForm, Controller } from "react-hook-form";

const NewPasswordScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [updatePassword, { isLoading }] = useUpdateForgetPasswordMutation();
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleResetPassword = async (data) => {
    try {
      const payload = { email, password: data.newPassword };
      await updatePassword(payload).unwrap();
      navigation.navigate("Login");
    } catch (error) {
      alert(error.data?.message || "Error resetting password.");
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "newPassword") setPasswordVisible(!passwordVisible);
    if (field === "confirmPassword")
      setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* New Password Input */}
      <Controller
        control={control}
        name="newPassword"
        defaultValue=""
        rules={{
          required: "New Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!passwordVisible}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility("newPassword")}
              style={styles.iconContainer}
            >
              <Text>{passwordVisible ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.newPassword && (
        <Text style={styles.error}>{errors.newPassword.message}</Text>
      )}

      {/* Confirm Password Input */}
      <Controller
        control={control}
        name="confirmPassword"
        defaultValue=""
        rules={{
          required: "Confirm Password is required",
          validate: (value) =>
            value === watch("newPassword") || "Passwords do not match",
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility("confirmPassword")}
              style={styles.iconContainer}
            >
              <Text>{confirmPasswordVisible ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      {/* Reset Password Button */}
      <Button
        title={isLoading ? "Resetting Password..." : "Reset Password"}
        onPress={handleSubmit(handleResetPassword)}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  iconContainer: {
    marginLeft: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default NewPasswordScreen;

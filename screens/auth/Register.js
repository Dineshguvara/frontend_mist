 import React, { useEffect, useState } from "react";
 import {
   View,
   Text,
   TextInput,
   Button,
   StyleSheet,
   TouchableOpacity,
   Alert,
 } from "react-native";
 import { useFormik } from "formik";
 import * as Yup from "yup";
 import { useRegisterMutation } from "../../redux/services/authApi";
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import { useNavigation } from "@react-navigation/native";
 import { Linking } from "react-native";

 const RegisterScreen = () => {
   const [register, { isLoading }] = useRegisterMutation(); // Register API
   const navigation = useNavigation();

   // **State to store token**
   const [token, setToken] = useState(null);

   // **Retrieve and parse the token from URL**
   useEffect(() => {
     const getTokenFromUrl = async () => {
       try {
         const initialUrl = await Linking.getInitialURL();
         if (initialUrl) {
           const parsedToken = new URLSearchParams(
             initialUrl.split("?")[1]
           ).get("token");
           setToken(parsedToken); // Store the token
         }
       } catch (error) {
         console.error("Error fetching token from URL", error);
       }
     };

     getTokenFromUrl();
   }, []);

   // **Validation Schema**
   const validationSchema = Yup.object({
     email: Yup.string().email("Invalid email").required("Email is required"),
     password: Yup.string()
       .min(6, "Password must be at least 6 characters")
       .required("Password is required"),
     name: Yup.string().required("Name is required"),
   });

   // **Formik Logic**
   const formik = useFormik({
     initialValues: {
       email: "",
       password: "",
       name: "",
     },
     validationSchema,
     onSubmit: async (values) => {
       if (!token) {
          console.log("Error", "Token is missing.");
         return;
       }

       try {
         // Add token in params
         const response = await register({ ...values, token }).unwrap();
        //  console.log(
        //    "Success:",
        //    response.message || "Registration successful!"
        //  );
         navigation.navigate("Drawer"); // Navigate to another screen
       } catch (error) {
         console.log("Error:", error.data?.message || "Registration failed");
       }
     },
   });

   return (
     <View style={styles.container}>
       <Text style={styles.title}>Register</Text>

       {/* Name Field */}
       <TextInput
         style={styles.input}
         placeholder="Name"
         onChangeText={formik.handleChange("name")}
         onBlur={formik.handleBlur("name")}
         value={formik.values.name}
       />
       {formik.touched.name && formik.errors.name && (
         <Text style={styles.error}>{formik.errors.name}</Text>
       )}

       {/* Email Field */}
       <TextInput
         style={styles.input}
         placeholder="Email"
         keyboardType="email-address"
         onChangeText={formik.handleChange("email")}
         onBlur={formik.handleBlur("email")}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email && (
         <Text style={styles.error}>{formik.errors.email}</Text>
       )}

       {/* Password Field */}
       <TextInput
         style={styles.input}
         placeholder="Password"
         secureTextEntry
         onChangeText={formik.handleChange("password")}
         onBlur={formik.handleBlur("password")}
         value={formik.values.password}
       />
       {formik.touched.password && formik.errors.password && (
         <Text style={styles.error}>{formik.errors.password}</Text>
       )}

       {/* Register Button */}
       <Button
         title={isLoading ? "Registering..." : "Register"}
         onPress={formik.handleSubmit} // Submit the form
         disabled={isLoading}
       />

       {/* Login Navigation */}
       <TouchableOpacity
         onPress={() => navigation.navigate("Login")}
         style={styles.link}
       >
         <Text style={styles.linkText}>Already have an account? Login</Text>
       </TouchableOpacity>
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: { flex: 1, padding: 20, justifyContent: "center" },
   title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
   input: {
     borderWidth: 1,
     borderColor: "#ccc",
     padding: 10,
     marginBottom: 10,
     borderRadius: 5,
   },
   error: { color: "red", fontSize: 12, marginBottom: 10 },
   link: {
     marginTop: 20,
     alignItems: "center",
   },
   linkText: {
     color: "#007BFF",
     textDecorationLine: "underline",
   },
 });

 export default RegisterScreen;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator"; // Import the DrawerNavigator
import DetailsScreen from "../../screens/DetailsScreen";
import SchoolStack from "../school/SchoolStack";

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      {/* Embed the DrawerNavigator here */}
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }} // DrawerNavigator handles its own header
      />
      {/* Add non-drawer screens here */}
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: true, // Show a clean header with back arrow for DetailsScreen
          title: "Details",
        }}
      />
      {/* School-related navigation logic */}
      <Stack.Screen
        name="SchoolStack"
        component={SchoolStack}
        options={{
          headerShown: false, // Let the SchoolStack handle its own headers
        }}
      />
      
    </Stack.Navigator>
  );
}

export default MainStack;

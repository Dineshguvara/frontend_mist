import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsScreen from "../../../screens/DetailsScreen";
import SchoolStack from "../../school/SchoolStack";
import SuperAdminNavigationDrawer from "./SuperAdminNavigtionDrawer";

const SuperAdminStack = createStackNavigator();

function SuperAdminNavigationStack() {
  const roleName = useSelector((state) => state.authentication.roleName);
  return (
    <SuperAdminStack.Navigator initialRouteName="Drawer">
      {/* Embed the DrawerNavigator here */}
      <SuperAdminStack.Screen
        name="SuperAdminNavigationDrawer"
        component={SuperAdminNavigationDrawer}
        options={{ headerShown: false }} // DrawerNavigator handles its own header
      />
      {/* Add non-drawer screens here */}
      <SuperAdminStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: true, // Show a clean header with back arrow for DetailsScreen
          title: "Details",
        }}
      />
      {/* School-related navigation logic */}
      <SuperAdminStack.Screen
        name="SchoolStack"
        component={SchoolStack}
        options={{
          headerShown: false, // Let the SchoolStack handle its own headers
        }}
      />
    </SuperAdminStack.Navigator>
  );
}

export default SuperAdminNavigationStack;

import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralNavigationDrawer from "./GeneralNavigationDrawer";
import GeneralProfileScreen from "../../../screens/GeneralProfile";

const GeneralStack = createStackNavigator();

function GeneralNavigationStack() {
  const roleName = useSelector((state) => state.authentication.roleName);
  return (
    <GeneralStack.Navigator initialRouteName="Drawer">
      {/* Embed the DrawerNavigator here */}
      <GeneralStack.Screen
        name="GeneralNavigationDrawer"
        component={GeneralNavigationDrawer}
        options={{ headerShown: false }} // DrawerNavigator handles its own header
      />

      {/* Add non-drawer screens here */}
      <GeneralStack.Screen
        name="GeneralProfile"
        component={GeneralProfileScreen}
        options={{
          headerShown: true, // Show a clean header with back arrow for DetailsScreen
          title: "Details",
        }}
      />
      {/* School-related navigation logic */}
    </GeneralStack.Navigator>
  );
}

export default GeneralNavigationStack;

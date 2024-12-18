import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SuperAdminDashboardScreen from "../../../screens/superAdmin/SuperAdminDashboard";
import RolesScreen from "../../../screens/superAdmin/RolesScreen";
import MainSchoolScreen from "../../../screens/superAdmin/school/SchoolScreen";
import SuperAdminProfileScreen from "../../../screens/superAdmin/SuperAdminProfile";

const SuperAdminDrawer = createDrawerNavigator();

function SuperAdminNavigationDrawer() {
  return (
    <SuperAdminDrawer.Navigator initialRouteName="SuperAdminDashboard">
      <SuperAdminDrawer.Screen
        name="SuperAdminDashboard"
        component={SuperAdminDashboardScreen}
        options={{ drawerLabel: "Super Admin Screen" }}
      />
      <SuperAdminDrawer.Screen
        name="Roles"
        component={RolesScreen}
        options={{ drawerLabel: "Manage Roles" }}
      />
      <SuperAdminDrawer.Screen
        name="Schools"
        component={MainSchoolScreen}
        options={{ drawerLabel: "Manage Schools" }}
      />
      <SuperAdminDrawer.Screen
        name="SuperAdminProfile"
        component={SuperAdminProfileScreen}
        options={{ drawerLabel: "Super Admin Profile" }}
      />
    </SuperAdminDrawer.Navigator>
  );
}
export default SuperAdminNavigationDrawer;

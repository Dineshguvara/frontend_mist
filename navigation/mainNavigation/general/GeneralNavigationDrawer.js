import React from "react";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../../screens/HomeScreen";
import SettingsScreen from "../../../screens/SettingsScreen";
import PrincipalScreen from "../../../screens/principal/PrincipalScreen";

const GeneralDrawer = createDrawerNavigator();

function GeneralNavigationDrawer() {
  const roleName = useSelector((state) => state.authentication.roleName);

  // Role-based configuration
  const screens = {
    // admin: [
    //   {
    //     name: "ManageStaff",
    //     component: ManageStaffScreen,
    //     label: "Manage Staff",
    //   },
    // ],
    principal: [
      {
        name: "Princi",
        component: PrincipalScreen,
        label: "Principal Specific School ",
      },
    ],
    // staff: [
    //   {
    //     name: "ClassSchedule",
    //     component: ClassScheduleScreen,
    //     label: "Class Schedule",
    //   },
    // ],
    // student: [
    //   { name: "MyCourses", component: MyCoursesScreen, label: "My Courses" },
    // ],
  };

  return (
    <GeneralDrawer.Navigator initialRouteName="Home">
      {/* Common Screens */}
      <GeneralDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ drawerLabel: "Home" }}
      />
      <GeneralDrawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerLabel: "Settings" }}
      />
      {/* Dynamically Render Role-Specific Screens */}
      {screens[roleName]?.map((screen) => (
        <GeneralDrawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ drawerLabel: screen.label }}
        />
      ))}
    </GeneralDrawer.Navigator>
  );
}

export default GeneralNavigationDrawer;

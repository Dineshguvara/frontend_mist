import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateSchoolScreen from "../../screens/superAdmin/school/CreateSchool";
import EditSchoolScreen from "../../screens/superAdmin/school/EditSchool";
import SchoolDetailScreen from "../../screens/superAdmin/school/SchoolDetatil";

const SchoolStackNavigator = createStackNavigator();

function SchoolStack() {
  return (
    <SchoolStackNavigator.Navigator
    //   initialRouteName="SchoolList" // Set the initial route explicitly
    >
      <SchoolStackNavigator.Screen
        name="SchoolDetail"
        component={SchoolDetailScreen}
        options={{
          headerShown: true,
          title: "School Details",
        }}
      />
      <SchoolStackNavigator.Screen
        name="CreateSchool"
        component={CreateSchoolScreen}
        options={{
          headerShown: true,
          title: "Create School",
        }}
      />
      <SchoolStackNavigator.Screen
        name="EditSchool"
        component={EditSchoolScreen}
        options={{
          headerShown: true,
          title: "Edit School",
        }}
      />
    </SchoolStackNavigator.Navigator>
  );
}

export default SchoolStack;

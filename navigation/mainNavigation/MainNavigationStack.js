import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import SuperAdminNavigationStack from "./superAdmin/SuperAdminNavigateStack";
import GeneralNavigationStack from "./general/GeneralNavigationStack";
import UploadFileScreen from "../../screens/uploadFileScreen";
import DataListScreen from "../../screens/dataListScreen";

const MainStack = createStackNavigator();

function MainNavigationStack() {
  const roleName = useSelector((state) => state.authentication.roleName);
  return (
    <MainStack.Navigator initialRouteName="Drawer">
      {/* Embed the DrawerNavigator here
      <MainStack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }} // DrawerNavigator handles its own header
      /> */}

      {/* Conditional Drawer Navigation */}
      <MainStack.Screen
        name="Drawer"
        component={
          roleName === "super_admin"
            ? SuperAdminNavigationStack
            : GeneralNavigationStack
        }
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="UploadFile"
        component={UploadFileScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="DataList"
        component={DataListScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

export default MainNavigationStack;

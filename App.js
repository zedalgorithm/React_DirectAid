import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUPScreen from "./screens/SignUPScreen";
import AdminDashboard from "./screens/AdminDashboard";
import UserDashboard from "./screens/UserDashboard";
import dashboard from "./screens/dashboard";
import CancelReport from "./screens/CancelReport";
import scanqr from "./drawers/scanqr";
import Profile from "./drawers/Profiles";
import AdminProfiles from "./drawers/AdminProfiles";
import Report from "./drawers/Report";
import incidentreport from "./drawers/incidentreport";
import selection from "./drawers/selection";
import fire from "./screens/fire";
import police from "./screens/police";
import Settings from "./screens/Settings";
import Hotlines from "./screens/Hotlines";
import userhotlines from "./screens/userhotlines";
import { useFonts, PublicSans_400Regular } from '@expo-google-fonts/public-sans';



const Stack = createStackNavigator();





export default function App() {
  let [fontsLoaded] = useFonts({
    PublicSans_400Regular,
  });

  if (!fontsLoaded) {
    return null; // You can replace this with a loading screen if desired
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUPScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="dashboard" component={dashboard}  options={{headerShown: false}}/>
        <Stack.Screen name="CancelReport" component={CancelReport} options={{headerShown: false}}/>
        <Stack.Screen name="Scan" component={scanqr}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="AdminProfiles" component={AdminProfiles} options={{ headerShown: false }} />
       <Stack.Screen name="Report" component={Report} options={{ headerShown: false}}/>
       <Stack.Screen name="incidentreport" component={incidentreport} options={{headerShown: false}}/>
       <Stack.Screen name="selection" component={selection}/>
       <Stack.Screen name="fire" component={fire}/>
       <Stack.Screen name="police" component={police}/>
       <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
       <Stack.Screen name="Hotlines" component={Hotlines}/>
       <Stack.Screen name="userhotlines" component={userhotlines}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
}


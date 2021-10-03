import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "./assets/colors/colors";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import EmergencyContact from "./screens/EmergencyContact";
import ImagePickerScreen from "./screens/ImagePickerScreen";
import SignUpSuccessful from "./screens/SignUpSuccessful";

import Dashboard from "./screens/Dashboard";
import CameraApplication from "./screens/Camera";
import CameraSuccessful from "./screens/CameraSuccessful";
import InputUserDetails from "./screens/InputUserDetails";
import InputUserDetailSuccessful from "./screens/InputUserDetailSuccessful";
import UserLocation from "./screens/UserLocation";
import UserLocationSuccessful from "./screens/UserLocationSuccessful";
import UserLocationFailed from "./screens/UserLocationFailed";
import HealthDetails from "./screens/HealthDetails";
import HealthDetailsSuccessful from "./screens/HealthDetailsSuccessful";
import HealthDetailsFailed from "./screens/HealthDetailsFailed";
import EmergencyDetails from "./screens/EmergencyDetails";
import EmergencyDetailsFailed from "./screens/EmergencyDetailsFailed";
import EmergencyDetailsSuccessful from "./screens/EmergencyDetailsSuccessful";
import IncidentReported from "./screens/IncidentReported";

import Drawer from "./screens/Drawer";
import Settings from "./screens/Drawer/Settings";
import ChangeUsername from "./screens/Drawer/Settings/ChangeUsername";
import ChangeUsernameSuccessful from "./screens/Drawer/Settings/ChangeUsernameSuccessful";
import ChangePassword from "./screens/Drawer/Settings/ChangePassword";
import ChangePasswordSuccessful from "./screens/Drawer/Settings/ChangePasswordSuccessful";
import ChangeContact from "./screens/Drawer/Settings/ChangeContact";
import ChangeContactSuccessful from "./screens/Drawer/Settings/ChangeContactSuccessful";

import Admin from "./screens/AdminScreens";
import AdminLogin from "./screens/AdminScreens/Login";
import AdminDashboard from "./screens/AdminScreens/Dashboard";
import AdminUserDetails from "./screens/AdminScreens/UserDetails";
import AdminUserDetailsEdit from "./screens/AdminScreens/UserDetailsEdit";
import UserDetailSuccessful from "./screens/AdminScreens/UserDetailSuccessful";
import Notifications from "./screens/AdminScreens/Notifications";
import AdminDrawer from "./screens/AdminScreens/Drawer";
import AdminSettings from "./screens/AdminScreens/Drawer/AdminSettings";
import AdminChangePassword from "./screens/AdminScreens/Drawer/ChangePassword";
import ChangeAdminPasswordSuccessful from "./screens/AdminScreens/Drawer/ChangePasswordSuccessful";

const Stack = createNativeStackNavigator();

export default App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "700",
					},
					headerTitleAlign: "center",
				}}>
				<Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
				<Stack.Screen name="Admin Login" component={AdminLogin} />
				<Stack.Screen name="Admin Dashboard" component={AdminDashboard} options={{ headerShown: false }} />
				<Stack.Screen name="Admin Drawer" component={AdminDrawer} options={{ headerShown: false }} />
				<Stack.Screen name="Admin Settings" component={AdminSettings} />
				<Stack.Screen name="User Details" component={AdminUserDetails} />
				<Stack.Screen name="Input User Details" component={InputUserDetails} />
				<Stack.Screen name="Input User Detail Successful" component={InputUserDetailSuccessful} />
				<Stack.Screen name="Change Admin Password" component={AdminChangePassword} options={{ headerShown: false }} />
				<Stack.Screen
					name="Change Admin Password Successful"
					component={ChangeAdminPasswordSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="User Edit" component={AdminUserDetailsEdit} options={{ headerShown: false }} />
				<Stack.Screen name="User Detail Successful" component={UserDetailSuccessful} options={{ headerShown: false }} />
				<Stack.Screen name="Notifications" component={Notifications} />
				<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="Sign Up" component={SignUp} />
				<Stack.Screen name="Login" component={Login} options={{ title: "Sign In" }} />
				<Stack.Screen name="Emergency Contacts" component={EmergencyContact} />
				<Stack.Screen name="Image Picker Screen" component={ImagePickerScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Sign Up Successful" component={SignUpSuccessful} />
				<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
				<Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
				<Stack.Screen name="Change Username" component={ChangeUsername} options={{ headerShown: false }} />
				<Stack.Screen name="Change Password" component={ChangePassword} options={{ headerShown: false }} />
				<Stack.Screen name="Change Contact" component={ChangeContact} options={{ headerShown: false }} />
				<Stack.Screen name="Camera Application" component={CameraApplication} options={{ headerShown: false }} />
				<Stack.Screen name="Camera Successful" component={CameraSuccessful} options={{ headerShown: false }} />
				<Stack.Screen name="User Location" component={UserLocation} options={{ title: "Your Location" }} />
				<Stack.Screen
					name="User Location Successful"
					component={UserLocationSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="User Location Failed" component={UserLocationFailed} options={{ headerShown: false }} />
				<Stack.Screen name="Health Details" component={HealthDetails} options={{ headerShown: false }} />
				<Stack.Screen
					name="Health Details Added Successful"
					component={HealthDetailsSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Health Details Failed" component={HealthDetailsFailed} options={{ headerShown: false }} />
				<Stack.Screen name="Emergency Details" component={EmergencyDetails} options={{ headerShown: false }} />
				<Stack.Screen
					name="Emergency Details Failed"
					component={EmergencyDetailsFailed}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Emergency Details Added Successful"
					component={EmergencyDetailsSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Incident Reported" component={IncidentReported} options={{ headerShown: false }} />
				<Stack.Screen
					name="Change Username Successful"
					component={ChangeUsernameSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Change Password Successful"
					component={ChangePasswordSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Change Contact Successful"
					component={ChangeContactSuccessful}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
			</Stack.Navigator>
			<StatusBar style="dark" />
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: colors.primary,
		textAlign: "center",
	},
});

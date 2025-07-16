import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";   
import HomeScreen from "../screens/home/HomeScreen";
import notificationScreen from "../screens/Notification/notificationScreen";
import profileScreen from "../screens/profile/profileScreen";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters"; // Importing size utilities for responsive design
import {Ionicons} from '@expo/vector-icons'; // Importing Ionicons for tab icons
import { IS_Android } from "../constants/constant";
import { useTranslation } from "react-i18next"; // Importing useTranslation for internationalization

const Tab = createBottomTabNavigator();

export default function MainAppBottomTabs() {
const { t } = useTranslation()
return (
    
    <Tab.Navigator
    
        screenOptions={{
            headerShown: false, // Hide the header for all screens in this tab navigator
            tabBarActiveTintColor:AppColors.icon, // Set the active tab color
            tabBarLabelStyle:{
                fontSize: s(12), // Set the font size for tab labels
                marginTop: vs(4) // Add some top margin to the labels
            },
            tabBarStyle:IS_Android &&{
                height: vs(55) // Set the height of the tab bar for Android
            }
            }}
            > 
        <Tab.Screen name="Home" component={HomeScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color}/>
                ), 
                title: t("Home") // Set the title for the Home tab
            }}
            />
        
        <Tab.Screen name="Notifications" component={notificationScreen}
        options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="notifications" size={size} color={color}/>
                ),
                title: t("Notifications"), // Set the title for the Home tab
            }}/>
        <Tab.Screen name="Profile" component={profileScreen}
         options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color}/>
                ),
                title: t("Profile"), // Set the title for the Home tab
            }}/>
    </Tab.Navigator>

)

}
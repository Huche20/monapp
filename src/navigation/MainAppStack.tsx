import { createStackNavigator } from '@react-navigation/stack';
import MainAppBottomTabs from './MainAppBottomTabs';
import AuthStack from './AuthStack';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createStackNavigator();

export default function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

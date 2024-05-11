import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login,signup,Welcome, Home } from '../screens';
import TabNavigation from './TabNavigation';
import ReptileRegistrationScreen from '../screens/PetRegisteration';
import ReptileRecognition from '../screens/ReptileRecognition';
import SocialMedia from '../screens/SocialMedia';
import Trivia from '../screens/Trivia';
import Care from '../screens/Care.js';
import ConservationStatus from '../screens/ConservationStatus.js';
import Junction from '../screens/Junction.js'
import Report from '../screens/ReportToWild.js'
import NecTimerSchedScreen from '../screens/NecTimerSchedScreen.js';
import MorphTracking from '../screens/MorphTracking.js';
import FirstAidSuggestions from '../screens/FirstAidSuggestions.js';
import SuggestionScreen from '../screens/SuggestionScreen.js';
import NotificationsScreen from '../screens/NotificationsScreen.js';
import ReportToWild from '../screens/ReportToWild.js';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={signup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Menu"
          component={TabNavigation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="petreg"
          component={ReptileRegistrationScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ReptRec"
          component={ReptileRecognition}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SocMedia"
          component={SocialMedia}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Trivia"
          component={Trivia}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Care"
          component={Care}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ConservationStatus"
          component={ConservationStatus}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Junction"
          component={Junction}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Report"
          component={ReportToWild}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="NecTimerSchedScreen"
          component={NecTimerSchedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MorphTracking"
          component={MorphTracking}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="FirstAidSuggestions"
          component={FirstAidSuggestions}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Suggestion" 
        component={SuggestionScreen} 
        options={{ 
          headerShown: false }} />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
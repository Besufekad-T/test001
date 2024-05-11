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
          name="Home"
          component={TabNavigation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="petreg"
          component={ReptileRegistrationScreen}
          options={{ title: 'Pet Registration' }}
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
            title: 'Social Media' 
          }}
        />
        <Stack.Screen
          name="Trivia"
          component={Trivia}
          options={{
            title: 'Trivia' 
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
            title: 'Report to Wildlife'
          }}
        />
        <Stack.Screen
          name="NecTimerSchedScreen"
          component={NecTimerSchedScreen}
          options={{title: 'Necessity Timer & Schedule'}}
        />
        <Stack.Screen
          name="MorphTracking"
          component={MorphTracking}
          options={{
            title: 'Morph Tracking' 
          }}
        />
        <Stack.Screen
          name="FirstAidSuggestions"
          component={FirstAidSuggestions}
          options={{
            title: 'First Aid Suggestions'
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
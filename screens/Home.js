import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import COLORS from '../constants/colors';
import PetRegButton from '../components/PetRegButtons';
import TriviaButton from '../components/TriviaButton';
import Divider from '../components/Divider';
import SocialMediaButton from '../components/SocMediaButton';
import NecTimerSchedButton from '../components/NecTimerSchedButton';
import MorphTrackingButton from '../components/MorphTrackingButton';
import FirstAidButton from '../components/FirstAidButton';
import Report2WildButton from '../components/Report2WildButton';



export default function Home({ navigation }) {
  return (
    
    <View style={[styles.container, {flex: 1}]}>
      {/* <Text style={styles.text}>Home</Text> */}
      {/* Added a scrollview to allow for scrolling when the content is too long */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 5,
          top:31

          
        }}>
          <Pressable
            onPress={() => navigation.navigate("petreg")}
            style={styles.buttoncontainer}
            
          >
          <PetRegButton/>
          
          </Pressable>
          
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 5
          
        }}>
          <Pressable
            onPress={() => navigation.navigate("Trivia")}
            style={styles.buttoncontainer}

          >
          <TriviaButton/>
          </Pressable>
          
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 5
          
        }}>
          <Pressable
            onPress={() => navigation.navigate("SocMedia")}
            style={styles.buttoncontainer}
          >
          <SocialMediaButton/>
          </Pressable>
          
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center", 
          marginVertical: 5,
        }}>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 5
          
        }}>
          <Pressable
            onPress={() => navigation.navigate("Report")}
            style={styles.buttoncontainer}
          >
          <Report2WildButton/>
          </Pressable>
          
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center", 
          marginVertical: 5,
        }}>
          <Pressable
            onPress={() => navigation.navigate("NecTimerSchedScreen")}
            style={styles.buttoncontainer}
          >
          <NecTimerSchedButton/>
          </Pressable>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center", 
          marginVertical: 5,
        }}>
          <Pressable
            onPress={() => navigation.navigate("MorphTracking")}
            style={styles.buttoncontainer}
          >
          <MorphTrackingButton/>
          </Pressable>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "center", 
          marginVertical: 5,
        }}>
          <Pressable
            onPress={() => navigation.navigate("FirstAidSuggestions")}
            style={styles.buttoncontainer}
          >
          <FirstAidButton/>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollViewContent:{
    alignItems: 'center',
    paddingVertical: 20
  },
  text: {
    fontSize: 24, 
    fontWeight: 'bold', 
  },
  buttoncontainer:{
   marginVertical: 22,
  }
});

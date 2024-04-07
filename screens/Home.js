import React from 'react';
import { View, Text, StyleSheet, Pressable,ScrollView } from 'react-native';
import COLORS from '../constants/colors';
import PetRegButton from '../components/PetRegButtons';
import TriviaButton from '../components/TriviaButton';
import Divider from '../components/Divider';
import SocialMediaButton from '../components/SocMediaButton';
import MorphTrackingButton from '../components/MorphTrackingButton';



export default function Home({ navigation }) {
  return (
    
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home</Text> */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}></ScrollView>
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22,
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
        marginVertical: 22
        
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
        marginVertical: 22
        
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
        marginVertical: 22
        
      }}>
        <Pressable
          onPress={() => navigation.navigate("MorphTracking")}
          style={styles.buttoncontainer}

        >
       <MorphTrackingButton/>
        </Pressable>
        
      </View>

      <ScrollView/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 24, 
    fontWeight: 'bold', 
  },
  buttoncontainer:{
   top:-200,
   


  }
});

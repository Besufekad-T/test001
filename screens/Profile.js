import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Firebase_auth } from '../firebase';
import COLORS from '../constants/colors';
import TabNavigation from '../navigation/TabNavigation';

export default function Home({ navigation }) {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const currentUser = Firebase_auth.currentUser;
    setUser(currentUser);
  }, []);
  
  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.text}>Email: {user.email}</Text>
        </>
      ):(
        <Text style={styles.text}>No user logged in</Text>
      )}      
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
});

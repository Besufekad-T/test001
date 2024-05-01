import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Firebase_auth } from '../firebase';
import COLORS from '../constants/colors';
import TabNavigation from '../navigation/TabNavigation';
import { TextInput } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
  const [ user, setUser ] = useState(null);
  const [ username, setUsername ] = useState('');
  const [ friendList, setFriendList] = useState([]);
  const [ newFriend, setNewFriend ] = useState('');

  useEffect(() => {
    const currentUser = Firebase_auth.currentUser;
    setUsername(currentUser.username);
  }, []);

  const addFriend = () => {
    setFriendList([...friendList, newFriend]);
    setNewFriend('');
  };
  
  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.text}>email: {user.email}</Text>
          <Text style={styles.text}>username: {username}</Text>
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

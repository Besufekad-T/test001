import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from './NotificationsScreen';
import Profile from './Profile';
import { db } from '../firebase'; // Ensure db is properly configured and exported
import {addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { TextInput, Alert } from 'react-native';

const Tab = createBottomTabNavigator();

// New Post Screen as an inline component for direct integration
const NewPostScreen = () => {
  const [content, setContent] = useState('');

  const handlePost = async () => {
    if (content.trim() === '') {
      Alert.alert('Error', 'Please enter some content for your post.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        content,
        timestamp: serverTimestamp(), // Use serverTimestamp for Firestore
      });
      setContent('');
      Alert.alert('Success', 'Your post has been submitted successfully.');
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to submit your post. Please try again later.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        multiline
        placeholder="Enter your post content..."
        value={content}
        onChangeText={setContent}
        style={{ width: '80%', height: 200, borderWidth: 1, borderColor: 'gray', padding: 10 }}
      />
      <TouchableOpacity onPress={handlePost} style={{ marginTop: 20, backgroundColor: 'green', padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const SocialMedia = ({ navigation }) => {
  // Removed the back handle function and component as it's generally managed by navigation headers or custom buttons within screens

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Continues to hide the header across all screens
        tabBarShowLabel: false, // Optionally hide tab bar labels for a cleaner look
        tabBarStyle: { paddingBottom: 5, paddingTop: 5 }, // Improve tab bar styling
      }}
    >
      <Tab.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color="green" />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={24} color="green" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color="green" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SocialMedia;
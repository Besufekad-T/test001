import React, {useEffect, useState, useCallback} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput, Alert, View, TouchableOpacity, Text, PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from './NotificationsScreen';
import Profile from './Profile';
import { db } from '../firebase'; // Ensure db is properly configured and exported
import {addDoc, collection, serverTimestamp, query, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore';

import { ref } from 'firebase/storage';

const Tab = createBottomTabNavigator();

// New Post Screen as an inline component for direct integration
const NewPostScreen = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      if (response.uri) {
        setMedia(response);
      }
    })
  }
  
  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if(hasPermission){
      launchCamera({}, (response) => {
        if (response.uri) {
          setMedia(response);
        }
      })
    }
  }

  const handlePost = async () => {
    if (content.trim() === '') {
      Alert.alert('Error', 'Please enter some content for your post.');
      return;
    }

    let mediaUrl = '';

    if (media) {
      const storageRef = ref(storage, `posts/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, media.uri);
      try {
        await uploadTask;
        mediaUrl = await getDownloadURL(storageRef);
      } catch(error) {
        console.error("Error uploading media: ", error);
        Alert.alert('Error', 'Failed to upload media. Please try again later.');
        return;
      }
    }

    try {
      await addDoc(collection(db, 'posts'), {
        content,
        mediaUrl,
        timestamp: serverTimestamp(), // Use serverTimestamp for Firestore
      });
      setContent('');
      setMedia(null);
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
      <TouchableOpacity onPress={handleChoosePhoto} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Choose Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTakePhoto} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePost} style={{ marginTop: 20, backgroundColor: 'green', padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

// Posts Screen component
const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Firestore
  const fetchPosts = useCallback(async () => {
    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(postsQuery);
    setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }, []);

  // Delete post from Firestore
  const deletePost = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
    //Refresh posts after deletion
    fetchPosts();
  };

  // Focus effect to refresh posts when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {posts.map(post => (
      <TouchableOpacity
        key={post.id}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, width: '90%' }}
        onLongPress={() => {
          Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => deletePost(post.id) }
            ]
          );
        }}
      >
        <Text>{post.content}</Text>
        {post.mediaUrl && <Image source={{ uri: post.mediaUrl }} style={{ width: 100, height: 100 }} />}
        <Text>Published on: {post.timestamp.toDate().toLocaleDateString()}</Text>
      </TouchableOpacity>
    ))}
  </View>
  );
};

const SocialMedia = ({ navigation }) => {
  // Removed the back handle function and component as it's generally managed by navigation headers or custom buttons within screens

  const [user, setUser] = useState(null); // Removed the user state as it's not used in this component
  
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
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={24} color="green" />
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
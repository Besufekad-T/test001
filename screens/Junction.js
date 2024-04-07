import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Junction = ({ route, navigation }) => {
  const { imageUri, analysisResult } = route.params;
  
  
  console.log(route.params)
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reptile Info</Text>
      </View>
      <View style={styles.imageContainer}>
        {/* Display the image using the URI */}
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
          resizeMode="contain" // Add this to ensure the image fits well
        />
      </View>
      {/* Display the analysis result */}
      <Text style={styles.reptileInfoText}>{analysisResult}</Text>
      <View style={styles.buttonContainer}>
        {/* If you have other buttons or functionality, include them here */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Care", { reptileInfo: analysisResult })}>
          <Text style={styles.buttonText}>View Care Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConservationStatus', { reptileInfo: analysisResult })}>
          <Text style={styles.buttonText}>Conservation Status</Text>
        </TouchableOpacity>
        {/* Go Back Button */}
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    reptileInfoText: {
        margin: 20,
        padding: 10,
        backgroundColor: '#ffffff',
        color: '#006400',
        fontSize: 12,
        textAlign: 'center',
        borderRadius: 10,
        elevation: 3, // only works on Android for shadow effect
        shadowColor: '#000', // shadow properties for iOS
        shadowOffset: { width: 0, height: 2 }, // shadow properties for iOS
        shadowOpacity: 0.25, // shadow properties for iOS
        shadowRadius: 3.84, // shadow properties for iOS
      },       
  container: {
    flex: 1,
    backgroundColor: '#006400', // Set the green background color here
    padding: 10, // Add padding to create space around the image
  },
  header: {
    backgroundColor: '#006400',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    left:140,
    top:20
  },
  headerText: {
    color: '#98FB98',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  goBackButton: {
    backgroundColor: '#98FB98', // A lighter green color for the go-back button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 300, // Set a fixed width for the square container
    height: 200, // Set a fixed height for the square container
    backgroundColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    left:60,
    top:60
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2D882D',
    borderRadius: 20, // Adjust this for more or less rounded corners
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '80%', // Adjust this if you want to change the width of the buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText1: {
    color: '#98FB98',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    top:30,
    left:96
  },
  headerText2: {
    color: '#98FB98',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    top:30,
    left:226
  },
});

export default Junction;
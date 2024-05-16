import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

const Junction = ({ route, navigation }) => {
  const { imageUri, analysisResult } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reptile Info</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
          resizeMode="contain"
        />
      </View>
      {/* Wrapped the analysis result in a ScrollView */}
      <ScrollView style={styles.scrollableView}>
        <Text style={styles.reptileInfoText}>{analysisResult}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Care", { reptileInfo: analysisResult })}>
          <Text style={styles.buttonText}>View Care Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConservationStatus', { reptileInfo: analysisResult })}>
          <Text style={styles.buttonText}>Conservation Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006400',
    padding: 10,
  },
  header: {
    backgroundColor: '#006400',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: 140,
    top: 20
  },
  headerText: {
    color: '#98FB98',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  imageContainer: {
    width: 300,
    height: 200,
    backgroundColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    left: 60,
    top: 60
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scrollableView: {
    maxHeight: 200, // Set a maximum height for the scrollable area
    margin: 20,
  },
  reptileInfoText: {
    padding: 10,
    backgroundColor: '#ffffff',
    color: '#006400',
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2D882D',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#98FB98',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '80%',
  },
});

export default Junction;
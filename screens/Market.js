import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const Market = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [preserves, setPreserves] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      fetchNearbyPreserves(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchNearbyPreserves = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyBmLT4SxyLb_kIBVe8TUGty6MV76CptdQc';  // Replace with your actual Google API Key
      const keywords = "reptile store|reptile vendor|reptile market|reptile petstore";
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=32186.9&keyword=${encodeURIComponent(keywords)}&key=${apiKey}`;
      const response = await axios.get(url);
      setPreserves(response.data.results);
    } catch (error) {
      setErrorMsg('Failed to fetch preserves');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title={"Your Location"}
          />
          {preserves.map((preserve, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: preserve.geometry.location.lat, longitude: preserve.geometry.location.lng }}
              title={preserve.name}
              description={preserve.vicinity}
            />
          ))}
        </MapView>
      ) : <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.sectionTitle}>Nearby Wildlife Preservations</Text>
      {preserves.map((preserve, index) => (
        <View key={index} style={styles.preserveItem}>
          <Text style={styles.preserveName}>{preserve.name}</Text>
          <Text>{preserve.vicinity}</Text>
        </View>
      ))}
      {errorMsg && <Text style={styles.contactText}>{errorMsg}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
  },
  contactText: {
    marginLeft: 15,
    fontSize: 16,
  },
  preserveItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  preserveName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Market;
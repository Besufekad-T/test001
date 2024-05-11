import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ReptileRegistrationScreen = () => {
  const [reptileType, setReptileType] = useState("");
  const [speciesName, setSpeciesName] = useState("");
  const [age, setAge] = useState("");
  const [registered, setRegistered] = useState(false);
  const [savedReptiles, setSavedReptiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reptiles"));
        const reptileData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedReptiles(reptileData);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "reptiles"), {
        reptileType,
        speciesName,
        age,
      });
      console.log("Document written with ID: ", docRef.id);
      setRegistered(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/petreg.png")} style={styles.image} />
      </View>
      <Text style={styles.heading}>Reptile Pet Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Reptile Type"
        value={reptileType}
        onChangeText={setReptileType}
      />
      <TextInput
        style={styles.input}
        placeholder="Species Name"
        value={speciesName}
        onChangeText={setSpeciesName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {registered && (
        <View style={styles.savedValuesContainer}>
          <Text>Reptile Type: {reptileType}</Text>
          <Text>Species Name: {speciesName}</Text>
          <Text>Age: {age}</Text>
        </View>
      )}
      {savedReptiles.length > 0 && (
        <View style={styles.savedReptileContainer}>
          <Text style={styles.savedReptileHeading}>Saved Reptiles</Text>
          {savedReptiles.map((reptile) => (
            <View key={reptile.id} style={styles.savedReptileItem}>
              <Text>Reptile Type: {reptile.reptileType}</Text>
              <Text>Species Name: {reptile.speciesName}</Text>
              <Text>Age: {reptile.age}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  savedValuesContainer: {
    marginTop: 20,
  },
  savedReptileContainer: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  savedReptileHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  savedReptileItem: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ReptileRegistrationScreen;
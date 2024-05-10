// CareInfo.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const CareInfo = ({ route, navigation }) => {
  const { reptileInfo } = route.params; // Assume reptileInfo contains the name or relevant identifier
  const [loading, setLoading] = useState(true);
  const [careInfo, setCareInfo] = useState('');

  useEffect(() => {
    const fetchCareInfo = async () => {
      try {
        console.log("Fetching care info for:", reptileInfo);
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' // Replace with your actual API key
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo-instruct', // Adjust based on the model you have access to
            prompt: `Provide care instructions based on the information, ${reptileInfo}, as a pet. However, if the reptile is not suitable as a pet, please mention that as well.`,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          }),
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          setCareInfo(data.choices[0].text.trim());
        } else {
          setCareInfo('No care information received.');
        }        
      } catch (error) {
        console.error('Failed to fetch care info:', error);
        setCareInfo('Unable to fetch care information.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareInfo();
  }, [reptileInfo]); // Depend on reptileInfo to refetch if it changes

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Care Information: {careInfo}</Text>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  goBackButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CareInfo;
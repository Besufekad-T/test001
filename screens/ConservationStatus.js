import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ConservationStatus = ({ route, navigation }) => {
  const { reptileInfo } = route.params; // Use the passed reptile information
  const [loading, setLoading] = useState(true);
  const [conservationStatus, setConservationStatus] = useState('');

  useEffect(() => {
    const fetchConservationStatus = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  'Bearer ' // Replace YOUR_API_KEY with your actual key
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `What is the conservation status of the reptile identified in this information, ${reptileInfo}?, please explain in detail in a small paragraph`,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          }),
        });
        const data = await response.json();
        const status = data.choices[0].text.trim();
        setConservationStatus(status);
      } catch (error) {
        console.error('Failed to fetch conservation status:', error);
        setConservationStatus('Unable to fetch conservation status.');
      } finally {
        setLoading(false);
      }
    };

    fetchConservationStatus();
  }, [reptileInfo]); // Depend on reptileInfo to refetch if it changes

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.infoText}>Conservation Status:</Text>
        <Text style={styles.infoText}>{conservationStatus}</Text>
      </ScrollView>
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
  scrollView: {
    marginVertical: 20, // Provide some spacing around the scroll view
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

export default ConservationStatus;
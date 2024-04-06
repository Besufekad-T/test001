import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const readAndParseCsv = async () => {
    try {
      const csvFilePath = RNFS.MainBundlePath + '/events.csv';
      const csvFile = await RNFS.readFile(csvFilePath, 'utf8');
      return Papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => results.data,
      }).data;
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  };

  const fetchEventsFromOpenAI = async (eventsData) => {
    const prompt = eventsData.map(event => `${event.name}, ${event.date}, ${event.address}`).join('\n');
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "gpt-3.5-turbo-instruct", // Use the appropriate model name
        prompt,
        max_tokens: 300
      }, {
        headers: {
          'Authorization': `Bearer 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` // Replace with your actual API key
        }
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error calling OpenAI:', error);
    }
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const localEventsData = await readAndParseCsv();
      if (localEventsData) {
        const formattedEvents = await fetchEventsFromOpenAI(localEventsData);
        setEvents(formattedEvents);
      }
      setIsFetching(false);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isFetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : events ? (
        <Text style={styles.eventsText}>{events}</Text>
      ) : (
        <Text>No events to show.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsText: {
    fontSize: 16,
    color: 'black',
  },
});

export default EventsPage;

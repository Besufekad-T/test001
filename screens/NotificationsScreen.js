import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import eventsData from '../assets/events.json'; // Adjust the path to your events.json file
import axios from 'axios';

const NotificationsScreen = () => {
  const [events, setEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchEventsFromOpenAI = async (eventsData) => {
    const prompt = "Can you organize these events into a presentable list that shows each event's name, date, and address. Sort the lsit by soonest date."+ eventsData.map(event => `${event.name}, ${event.date}, ${event.address}`).join('\n');
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "gpt-3.5-turbo-instruct", 
        prompt,
        max_tokens: 300
      }, {
        headers: {
          'Authorization': ` ` // Replace with your actual OpenAI API key
        }
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return ''; // Return empty string on error
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchEventsFromOpenAI(eventsData).then(formattedEvents => {
      setEvents(formattedEvents);
      setIsFetching(false);
    });
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

export default NotificationsScreen;

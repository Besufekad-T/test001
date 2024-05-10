import React, { useState, useRef } from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input, Button, Card, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { getChat } from "../assets/utils/getChatGPT";

const FirstAidSuggestion = ({ navigation }) => {
  const [reptileType, setReptileType] = useState('');
  const [specificReptile, setSpecificReptile] = useState('');
  const [injuryLocation, setInjuryLocation] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleSubmit = async () => {
    if (reptileType && specificReptile && injuryLocation && timeElapsed) {
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides first aid suggestions for reptile-related injuries.',
        },
        {
          role: 'user',
          content: `I was injured by a ${specificReptile === 'unknown' ? reptileType : specificReptile} on my ${injuryLocation} about ${timeElapsed} minutes ago. What should I do?`,
        },
      ];

      try {
        const response = await getChat(messages);
        if (response.choices && response.choices.length > 0 && response.choices[0].message) {
          const suggestion = response.choices[0].message.content;
        //   setSuggestion(suggestion);
        //   Animated.timing(fadeAnim, {
        //     toValue: 1,
        //     duration: 1000,
        //     useNativeDriver: true,
        //   }).start();
          navigation.navigate('Suggestion', { suggestion });
        } else {
          console.error('Error: Invalid response from the API');
          setSuggestion('Sorry, an error occurred while fetching the suggestion.');
        }
      } catch (error) {
        console.error('Error fetching suggestion:', error);
        setSuggestion('Sorry, an error occurred while fetching the suggestion.');
      }
    }
  };

  const renderSpecificReptilePicker = () => {
    switch (reptileType) {
      case 'snake':
        return (
          <Picker
            selectedValue={specificReptile}
            onValueChange={(value) => setSpecificReptile(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Snake Type" value="" />
            <Picker.Item label="Rattlesnake" value="rattlesnake" />
            <Picker.Item label="Cobra" value="cobra" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="Viper" value="viper" />
            <Picker.Item label="Boa Constrictor" value="boa_constrictor" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        );
      case 'lizard':
        return (
          <Picker
            selectedValue={specificReptile}
            onValueChange={(value) => setSpecificReptile(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Lizard Type" value="" />
            <Picker.Item label="Gecko" value="gecko" />
            <Picker.Item label="Iguana" value="iguana" />
            <Picker.Item label="Chameleon" value="chameleon" />
            <Picker.Item label="Komodo Dragon" value="komodo_dragon" />
            <Picker.Item label="Monitor Lizard" value="monitor_lizard" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        );
      case 'turtle':
        return (
          <Picker
            selectedValue={specificReptile}
            onValueChange={(value) => setSpecificReptile(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Turtle Type" value="" />
            <Picker.Item label="Box Turtle" value="box_turtle" />
            <Picker.Item label="Sea Turtle" value="sea_turtle" />
            <Picker.Item label="Snapping Turtle" value="snapping_turtle" />
            <Picker.Item label="Softshell Turtle" value="softshell_turtle" />
            <Picker.Item label="Red-Eared Slider" value="red_eared_slider" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        );
      case 'crocodile':
        return (
          <Picker
            selectedValue={specificReptile}
            onValueChange={(value) => setSpecificReptile(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Crocodile Type" value="" />
            <Picker.Item label="Nile Crocodile" value="nile_crocodile" />
            <Picker.Item label="Saltwater Crocodile" value="saltwater_crocodile" />
            <Picker.Item label="American Crocodile" value="american_crocodile" />
            <Picker.Item label="Dwarf Crocodile" value="dwarf_crocodile" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        );
      case 'alligator':
        return (
          <Picker
            selectedValue={specificReptile}
            onValueChange={(value) => setSpecificReptile(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Alligator Type" value="" />
            <Picker.Item label="American Alligator" value="american_alligator" />
            <Picker.Item label="Chinese Alligator" value="chinese_alligator" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#c7f5d4', '#92d6b5', '#58b795']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card containerStyle={styles.card}>
          <Text style={styles.title}>First Aid Suggestion</Text>
          <Image
            source={require('../assets/fas.png')}
            style={styles.image}
          />
          <Picker
            selectedValue={reptileType}
            onValueChange={(value) => setReptileType(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Reptile Type" value="" />
            <Picker.Item label="Snake" value="snake" />
            <Picker.Item label="Lizard" value="lizard" />
            <Picker.Item label="Turtle" value="turtle" />
            <Picker.Item label="Crocodile" value="crocodile" />
            <Picker.Item label="Alligator" value="alligator" />
          </Picker>
          {renderSpecificReptilePicker()}
          <Picker
            selectedValue={injuryLocation}
            onValueChange={(value) => setInjuryLocation(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Injury Location" value="" />
            <Picker.Item label="Head" value="head" />
            <Picker.Item label="Neck" value="neck" />
            <Picker.Item label="Arm" value="arm" />
            <Picker.Item label="Hand" value="hand" />
            <Picker.Item label="Leg" value="leg" />
            <Picker.Item label="Foot" value="foot" />
            <Picker.Item label="Torso" value="torso" />
          </Picker>
          <Input
            placeholder="Time Elapsed (in minutes)"
            value={timeElapsed}
            onChangeText={(value) => setTimeElapsed(value)}
            leftIcon={<Icon name="timer" size={24} color="gray" />}
            keyboardType="numeric"
          />
          <Button
            title="Get Suggestion"
            onPress={handleSubmit}
            buttonStyle={styles.button}
          />
          {suggestion && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Card containerStyle={styles.suggestionCard}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </Card>
            </Animated.View>
          )}
        </Card>
        <AnimatedCircularProgress
          size={80}
          width={15}
          fill={suggestion ? 100 : 0}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          duration={2000}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    marginTop: 20,
    backgroundColor:'green'
  },
  suggestionCard: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  suggestionText: {
    fontSize: 18,
    color: '#00838f',
    textAlign: 'center',
  },
  image: {
    width: '50%',
    height: 100,
    resizeMode: 'cover',
    left:80
  },
});

export default FirstAidSuggestion;
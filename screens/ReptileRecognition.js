import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const ReptileRecognition = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });
    
    console.log(result)
   
    if (!result.cancelled) {
      const uriToPass = result.assets[0].uri
      setImageUri(uriToPass);
      analyzeImage(result.assets[0].base64, uriToPass);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.cancelled) {
      const uriToPass = result.assets[0].uri
      setImageUri(uriToPass);
      analyzeImage(result.assets[0].base64, uriToPass);
    }
  };

  const analyzeImage = async (base64Image, uri) => {
    console.log('Received Base64 Image String:', base64Image);
  
    // Early return if base64Image is not defined
    if (!base64Image) {
      console.error('The image string is undefined or not a string.');
      return;
    }
  
    // Define the JPEG prefix
    const jpegPrefix = 'data:image/jpeg;base64,';
  
    // Check if the base64 string already contains the correct prefix
    if (!base64Image.startsWith(jpegPrefix)) {
      console.log("Prefixing the base64 string with the JPEG MIME type");
      base64Image = jpegPrefix + base64Image;
    }
  
    // Log the prefixed base64 string
    console.log('Prefixed Base64 Image String:', base64Image);
  
    // Calculate the approximate size of the image data
    const sizeInBytesApprox = (base64Image.length - jpegPrefix.length) * (3 / 4);
    const sizeInMegabytesApprox = sizeInBytesApprox / (1024 * 1024);
    console.log(`Approximate image size: ${sizeInMegabytesApprox.toFixed(2)} MB`);
  
    // Ensure the image size is within the acceptable limit for OpenAI's API
    if (sizeInMegabytesApprox > 20) {
      console.error('Image size exceeds the maximum limit of 20 MB');
      return;
    }
  
    try {
      const response = await sendImageToOpenAI(base64Image);
      // Navigate using the direct URI passed as a parameter
      navigation.navigate('Junction', {
        imageUri: uri,
        analysisResult: response.data.choices[0].message.content,
      });
    } catch (error) {
      console.error('Error sending image to OpenAI:', error);
    }
  };
  
  
  const sendImageToOpenAI = async (base64Image) => {
    console.log(base64Image);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-vision-preview', // Make sure this is the correct model name.
          messages: [
            {
              "role": "user",
              "content": [
                {"type": "text", "text": "Please provide basic information about the reptile in the image, this information can include where they live mostly, what they eat, how long they live and etc. Please also include their common and scientific name at the beginning of your response."},
                {
                  "type": "image_url",
                  "image_url": {
                    "url": base64Image,
                    "detail": "low"
                  },
                },
              ],
            }
          ],
          temperature: 0.5,
          max_tokens: 200,
        },
        {
          headers: {
            'Authorization': `Bearer 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`, // Use the actual API key.
            'Content-Type': 'application/json'
          },
        }
      );
  
      console.log("OpenAI's response:", response.data);
      console.log('Navigating to Junction with URI:', imageUri);
      console.log('Navigating to Junction with Analysis Result:', response.data.choices[0].message.content);
      return response
      // Use the response as needed, e.g., navigate to a new screen.
    } catch (error) {
      console.error('Error sending image to OpenAI:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />
        <Button title="Pick Image" onPress={pickImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // This centers the button container vertically
    alignItems: 'center', // This centers the button container horizontally
    backgroundColor: '#fff', // Consider setting a background color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // This spaces the buttons evenly
    width: '80%', // Adjust width as necessary
  },
});
  

export default ReptileRecognition;
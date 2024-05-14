// Import necessary components from react-native
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

// Example test data
const testData = {
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ],
  posts: [
    { id: '1', title: 'Hello World', content: 'This is a test post.' },
    { id: '2', title: 'React Native', content: 'Building a search component.' },
  ],
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle the search
  const handleSearch = () => {
    // Combine users and posts into a single array for searching
    const combinedData = [...testData.users, ...testData.posts];
    // Filter the combined data based on the query
    const filteredResults = combinedData.filter(item => 
      item.name?.toLowerCase().includes(query.toLowerCase()) || 
      item.title?.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.name || item.title}: {item.email || item.content}</Text>
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginTop: 50,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default Search;
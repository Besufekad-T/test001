import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { db } from './firebase';  // Import Firestore instance
import { collection, addDoc, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

const NecTimerSchedScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        task,
        date,
        createdAt: serverTimestamp(),
      });
      setTask('');
      setDate('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Enter task" value={task} onChangeText={setTask} style={styles.input} />
      <TextInput placeholder="Enter date and time" value={date} onChangeText={setDate} style={styles.input} />
      <Button title="Add Task" onPress={addTask} />
      {tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          <Text style={styles.taskText}>{task.task} - {task.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  taskItem: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
  },
});

export default NecTimerSchedScreen;

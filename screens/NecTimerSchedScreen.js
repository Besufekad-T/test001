import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { db } from '../firebase';  // Import Firestore instance
import { collection, addDoc, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

const NecTimerSchedScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Added time state [1/2]
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
        date: date + ' ' + time,
        createdAt: serverTimestamp(),
      });
      setTask('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Add some padding at the top
  // Center the title and add some padding and green color
  // Give the "Add Task"button a green color
  return (
    <View style={styles.container}>
    <View style={{padding: 15}}>
      <Text style={{fontSize: 20, height: 40, padding: 5,
        color: 'white', backgroundColor: 'green',
        textAlign: 'center', justifyContent: 'center'}}>Schedule Tracker</Text>
    </View>    
    <View>
      <TextInput placeholder="Enter task" value={task} onChangeText={setTask} style={styles.input} />
      <TextInput placeholder="Enter date" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Enter time" value={time} onChangeText={setTime} style={styles.input} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Add Task" onPress={addTask} color="green"/>
      </View>
    </View>
    <ScrollView>
      {tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          <Text style={styles.taskText}>{task.task} - {task.date}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
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

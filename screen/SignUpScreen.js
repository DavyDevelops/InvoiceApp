import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MongoClient } from 'mongodb'; // Import the MongoDB client library
import { MONGODB_URI } from './config'; // Import the MongoDB URI from your config file

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      // Connect to the MongoDB database
      const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db('yourDatabaseName'); // Replace 'yourDatabaseName' with your MongoDB database name
      const collection = db.collection('users'); // Replace 'users' with your user collection name

      // Check if the user with the given email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        Alert.alert('Error', 'User with this email already exists.');
        return;
      }

      // Create a new user
      const newUser = { email, password };
      await collection.insertOne(newUser);

      // Close the MongoDB connection
      client.close();

      // Show success message and navigate back to the login screen
      Alert.alert('Success', 'Account created successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error during sign up:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;

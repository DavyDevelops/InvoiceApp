import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MongoClient } from 'mongodb'; // Import the MongoDB client library
import { MONGODB_URI } from './config'; // Import the MongoDB URI from your config file

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Connect to the MongoDB database
      const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db('yourDatabaseName'); // Replace 'yourDatabaseName' with your MongoDB database name
      const collection = db.collection('users'); // Replace 'users' with your user collection name

      // Find the user with the given email and password
      const user = await collection.findOne({ email, password });

      // Close the MongoDB connection
      client.close();

      if (!user) {
        Alert.alert('Error', 'Invalid email or password.');
      } else {
        console.log('User logged in:', user);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Log In" onPress={handleLogin} />
      <Text style={styles.navigationText}>Don't have an account? Sign Up</Text>
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
  navigationText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#00bcd4',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

// CreateInvoice.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connectToDB } from './db'; // Import the connectToDB function

const CreateInvoice = () => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleNext = async () => {
    // Save client information to MongoDB
    try {
      const db = await connectToDB(); // Connect to MongoDB
      const collection = db.collection('clients'); // Replace 'clients' with your collection name

      // Check if any field is empty
      if (!name || !business || !address || !email) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      // Insert the client information into the database
      await collection.insertOne({
        name,
        business,
        address,
        email,
      });

      // Show success message
      Alert.alert('Success', 'Client information saved successfully.');
      // Clear input fields after successful save
      setName('');
      setBusiness('');
      setAddress('');
      setEmail('');
      navigation.navigate('HomeScreen'); // Navigate back to the HomeScreen after successful save
    } catch (error) {
      console.error('Error saving client information:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Business Name</Text>
        <TextInput
          value={business}
          onChangeText={setBusiness}
          placeholder="Business Name"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.textInput}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  inputContainer: {
    marginTop: 15,
  },
  textInput: {
    marginTop: 4,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 1,
    padding: 4,
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default CreateInvoice;

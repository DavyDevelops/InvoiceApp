import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MongoClient } from 'mongodb'; // Import the MongoDB client library
import { MONGODB_URI } from './config'; // Import the MongoDB URI from your config file

const ClientInfo = () => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!name || !business || !address || !email) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Connect to the MongoDB database
      const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db('yourDatabaseName'); // Replace 'yourDatabaseName' with your MongoDB database name
      const collection = db.collection('clients'); // Replace 'clients' with your collection name

      // Save client information to MongoDB
      const result = await collection.insertOne({
        name,
        business,
        address,
        email,
      });

      if (result.insertedCount === 1) {
        // Show success message
        Alert.alert('Success', 'Client information saved successfully.');
        // Clear input fields after successful save
        setName('');
        setBusiness('');
        setAddress('');
        setEmail('');
        navigation.navigate('HomeScreen'); // Navigate back to the HomeScreen after successful save
      } else {
        Alert.alert('Error', 'An error occurred while saving client information.');
      }

      // Close the MongoDB connection
      client.close();
    } catch (error) {
      console.error('Error saving client information:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleDiscard = () => {
    // Show confirmation dialog
    Alert.alert(
      'Discard Client Information',
      'Are you sure you want to discard this client information?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Discard client information and clear input fields
            setName('');
            setBusiness('');
            setAddress('');
            setEmail('');
            navigation.navigate('HomeScreen');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handlePrintInvoice = () => {
    // Navigate to the PdfScreen and pass the client information as parameters
    navigation.navigate('PdfScreen', {
      name,
      business,
      address,
      email,
    });
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
        <Button title="Save" onPress={handleSave} />
        <Button title="Discard" onPress={handleDiscard} />
        <Button title="Print Invoice" onPress={handlePrintInvoice} />
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

export default ClientInfo;

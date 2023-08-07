// HomeScreen.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connectToDB } from './db'; // Import the connectToDB function

const HomeScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const db = await connectToDB(); // Connect to MongoDB
      const collection = db.collection('clients'); // Replace 'clients' with your collection name

      // Fetch invoices from the database
      const fetchedInvoices = await collection.find().toArray();

      setInvoices(fetchedInvoices);
    } catch (error) {
      console.error('An unexpected error occurred:', error.message);
    }
  };

  const handleEditInvoice = (invoice) => {
    navigation.navigate('EditInvoice', { invoice });
  };

  const handleDeleteInvoice = async (invoice) => {
    try {
      const confirm = await new Promise((resolve) =>
        Alert.alert(
          'Delete Invoice',
          'Are you sure you want to delete this invoice?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve(false),
            },
            {
              text: 'OK',
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
        )
      );

      if (confirm) {
        const db = await connectToDB(); // Connect to MongoDB
        const collection = db.collection('clients'); // Replace 'clients' with your collection name

        // Delete the invoice from the database
        await collection.deleteOne({ _id: invoice._id });
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error deleting invoice:', error.message);
    }
  };

  const InvoiceCard = ({ invoice }) => {
    return (
      <View style={styles.invoiceCard}>
        <Text>Invoice Number: {invoice.invoiceNumber}</Text>
        <Text>Name: {invoice.name}</Text>
        <Text>Business: {invoice.business}</Text>
        <View style={styles.invoiceCardButtons}>
          <Button title="Edit" onPress={() => handleEditInvoice(invoice)} />
          <Button title="Delete" onPress={() => handleDeleteInvoice(invoice)} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateInvoice')}>
          <Text>Create Invoice</Text>
        </TouchableOpacity>
        {invoices.length === 0 ? (
          <Text style={styles.noInvoicesText}>No invoices found.</Text>
        ) : (
          <FlatList
            data={invoices}
            renderItem={({ item }) => <InvoiceCard invoice={item} />}
            keyExtractor={(item) => item._id.toString()} // Replace '_id' with the ID field of your collection
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    height: 40,
    width: 120,
    backgroundColor: '#d7a519',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  noInvoicesText: {
    textAlign: 'center',
    marginTop: 20,
  },
  invoiceCard: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  invoiceCardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default HomeScreen;

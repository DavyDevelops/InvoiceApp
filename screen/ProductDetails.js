import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [showProductInput, setShowProductInput] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const navigation = useNavigation();

  const addProduct = (name, quantity, price) => {
    setProducts(products => [...products, { name, quantity, price }]);
    setName('');
    setQuantity(1);
    setPrice('');
    setShowProductInput(false);
  };

  // Calculate the total cost of all products
  const totalCost = products.reduce((total, product) => total + product.quantity * product.price, 0);

  return (
    <View style={styles.container}>
      <ScrollView>
        {showProductInput && (
          <>
            <View style={styles.inputContainer}>
              <Text>Product Name</Text>
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Product Quantity</Text>
              <View style={styles.quantityContainer}>
                <Button title="+" color="#000" onPress={() => setQuantity(quantity => quantity + 1)} />
                <Text>{quantity}</Text>
                <Button title="-" color="#000" onPress={() => setQuantity(quantity => Math.max(1, quantity - 1))} />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text>Product Price</Text>
              <TextInput
                placeholder="Price"
                style={styles.textInput}
                onChangeText={text => {
                  if (text[0] === '₦') {
                    text = text.slice(1);
                  }
                  setPrice(text);
                }}
                value={`₦${price}`}
              />
            </View>
            <View style={styles.inputContainer}>
              <Button title="Add Product" color="#000" onPress={() => addProduct(name, quantity, price)} />
            </View>
          </>
        )}
        <View style={styles.inputContainer}>
          <Button title="Add More Products" color="#000" onPress={() => setShowProductInput(true)} />
        </View>
        {/* Display the list of products */}
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text>Name: {item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ₦{item.price}</Text>
            </View>
          )}
        />
        {/* Display the total cost */}
        <View style={styles.totalContainer}>
          <Text>Total: ₦{totalCost}</Text>
        </View>
        {/* Add a button that navigates to the ClientInfo screen */}
        <View style={{ marginTop: 20 }}>
          <Button title="Go to Client Info" color="#000" onPress={() => navigation.navigate('ClientInfo')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
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
});

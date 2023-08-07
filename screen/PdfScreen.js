import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

const PdfScreen = ({ route }) => {
  const { name, business, address, email, products } = route.params;

  const handlePrintPDF = async () => {
    try {
      if (!name || !business || !address || !email) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Create a new page for the PDF
      const page = PDFPage.create();

      // Add content to the PDF page
      page.drawText('Invoice', {
        x: 50,
        y: 500,
        size: 24,
      });
      page.drawText(`Name: ${name}`, {
        x: 50,
        y: 470,
        size: 14,
      });
      page.drawText(`Business: ${business}`, {
        x: 50,
        y: 450,
        size: 14,
      });
      page.drawText(`Address: ${address}`, {
        x: 50,
        y: 430,
        size: 14,
      });
      page.drawText(`Email: ${email}`, {
        x: 50,
        y: 410,
        size: 14,
      });

      // Add product details to the PDF page
      let y = 390;
      for (const product of products) {
        page.drawText(`Product Name: ${product.name}`, {
          x: 50,
          y,
          size: 14,
        });
        y -= 20;
        page.drawText(`Quantity: ${product.quantity}`, {
          x: 50,
          y,
          size: 14,
        });
        y -= 20;
        page.drawText(`Price: ₦${product.price}`, {
          x: 50,
          y,
          size: 14,
        });
        y -= 30;
      }

      // Calculate the total cost of all products
      const totalCost = products.reduce((total, product) => total + product.quantity * product.price, 0);

      // Add total cost to the PDF page
      page.drawText(`Total Cost: ₦${totalCost}`, {
        x: 50,
        y,
        size: 14,
      });

      // Add signature to the PDF page (you can add this functionality if needed)
      // ...

      // Add the page to the document
      pdfDoc.addPage(page);

      // Save the PDF to a file
      const pdfBytes = await pdfDoc.save();

      // For simplicity, let's just log the PDF bytes
      console.log('PDF Bytes:', pdfBytes);

      // Implement logic to save the PDF to the device or send it via email, etc.
      // You can use the 'react-native-fs' library to save the PDF to the device's storage

      console.log('PDF Invoice generated!');
    } catch (error) {
      console.error('Error generating PDF:', error.message);
      Alert.alert('Error', 'An unexpected error occurred while generating the PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PDF Screen</Text>
      <View style={styles.infoContainer}>
        <Text>Name: {name}</Text>
        <Text>Business: {business}</Text>
        <Text>Address: {address}</Text>
        <Text>Email: {email}</Text>
        
         {/* Display product details */}
         {products.map((product) => (
           <View key={product.name}>
             <Text>Product Name: {product.name}</Text>
             <Text>Quantity: {product.quantity}</Text>
             <Text>Price: ₦{product.price}</Text>
           </View>
         ))}
         
         {/* Calculate and display total cost */}
         <Text>Total Cost:
           ₦{products.reduce((total, product) => total + product.quantity * product.price,0)}
         </Text>
         
         {/* Display signature (you can add this functionality if needed) */}
         {/* ... */}
         
       </View>
       <Button title="Print PDF Invoice" onPress={handlePrintPDF} />
     </View>
   );
};

const styles = StyleSheet.create({
   container:{
     flex :1 ,
     justifyContent:'center',
     alignItems:'center',
   },
   title:{
     fontSize :24 ,
     fontWeight:'bold',
     marginBottom :16 ,
   },
   infoContainer:{
     backgroundColor:'#eee',
     padding:10,
     marginVertical:10,
   },
});
export default PdfScreen;

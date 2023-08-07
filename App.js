import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateInvoice from './screen/CreateInvoice';
import ProductDetails from './screen/ProductDetails';
import ClientInfo from './screen/ClientInfo';
import HomeScreen from './screen/HomeScreen';
import SignUpScreen from './screen/SignUpScreen';
import LoginScreen from './screen/LoginScreen';
import PdfScreen from './screen/PdfScreen';
import { createClient } from '@supabase/supabase-js';

// ... (supabase client and other code)

const supabaseUrl = 'https://isjuitovviugepmotfrl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzanVpdG92dml1Z2VwbW90ZnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNjIxOTAsImV4cCI6MjAwNjkzODE5MH0.vICRXQ5CSs3s7xfXJQ2hOKq5E7FsDEWhUOaE1U0_x_E';
export const supabase = createClient(supabaseUrl, supabaseKey, {
  autoRefreshToken: true,
  persistSession: true,
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Invoicer' }}
        />
        <Stack.Screen
          name="CreateInvoice"
          component={CreateInvoice}
          options={{ title: 'Bill From' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen
          name="ClientInfo"
          component={ClientInfo}
          options={{ title: 'Bill To' }}
        />
        <Stack.Screen name="PdfScreen" component={PdfScreen} options={{ title: 'PDF Screen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

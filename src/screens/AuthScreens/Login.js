import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      setUser(userCredential.user); // Save the user in context and AsyncStorage
      Alert.alert('Success', 'Logged in successfully!');
<<<<<<< HEAD
      navigation.navigate('Home');
=======
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
<<<<<<< HEAD
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
=======
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6200EE',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#6200EE',
    marginTop: 10,
    fontSize: 14,
=======
    padding: 25,
    backgroundColor: '#f1f5f8', // Subtle light background for a modern touch
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000', // Subtle shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#6200EE',
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#6200EE',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 15,
  },
  linkText: {
    color: '#6200EE',
    fontSize: 16,
    textAlign: 'center',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  },
});

export default Login;

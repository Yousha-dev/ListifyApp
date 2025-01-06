import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us and start exploring!</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

<<<<<<< HEAD
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
=======
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
=======
    padding: 25,
    backgroundColor: '#f1f5f8', // Modern light background
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
<<<<<<< HEAD
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
    marginBottom: 25,
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
    shadowColor: '#000', // Soft shadow for input fields
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

export default Register;

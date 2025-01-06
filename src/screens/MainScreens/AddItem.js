import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
=======
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Picker } from '@react-native-picker/picker';
<<<<<<< HEAD
=======
import ImagePicker from 'react-native-image-crop-picker'; 
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
import { categories } from '../../data/categories';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState(null);
<<<<<<< HEAD
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
=======
  const [images, setImages] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [address, setAddress] = useState('');
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
<<<<<<< HEAD
=======
  const mapRef = useRef(null);
>>>>>>> 020c6d6 (Initial commit of ListifyApp)

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'authorized') {
        setCameraPermission(true);
      } else {
        Alert.alert('Camera permission not granted.');
      }
    };

    requestCameraPermission();
<<<<<<< HEAD

    // Initialize Geocoder with your API key
=======
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
    Geocoder.init('AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk');
  }, []);

  const handleLocationChange = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    getLocationAddress(latitude, longitude);
  };
<<<<<<< HEAD

=======
  
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  const getLocationAddress = (lat, long) => {
    Geocoder.from(lat, long)
      .then((json) => {
        const address = json.results[0].formatted_address;
<<<<<<< HEAD
=======
        setAddress(address); 
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        setLocation((prevLocation) => ({
          ...prevLocation,
          address,
        }));
      })
      .catch((error) => console.warn(error));
  };
<<<<<<< HEAD

  const takePicture = async () => {
    if (!cameraPermission) {
      const permission = await Camera.requestCameraPermission();
      if (permission !== 'authorized') {
        Alert.alert('Camera permission not granted.');
        return;
      }
      setCameraPermission(true);
    }

    if (camera.current) {
      const photo = await camera.current.takePhoto({
        flash: 'on',
        qualityPrioritization: 'quality',
      });
      setImage(`file://${photo.path}`);
    }
=======
  

  const searchAddress = async (query) => {
    if (query) {
      try {
        const response = await Geocoder.from(query);
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
        setAddress(query);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }, 1000);
        }
      } catch (error) {
        Alert.alert('Error', 'Could not find the address.');
      }
    }
  };

  const takePicture = async () => {
    if (!device) {
      Alert.alert('Camera Error', 'No camera device available.');
      return;
    }
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    const photo = await camera.current.takePhoto({
      quality: 0.7,
      skipMetadata: true,
    });
    const imageUri = `file://${photo.path}`;
    setImages((prevImages) => [...prevImages, imageUri]);
  };

  const pickImagesFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then((selectedImages) => {
      const imageUris = selectedImages.map((image) => image.path);
      setImages((prevImages) => [...prevImages, ...imageUris]);
    }).catch((error) => {
      console.warn(error);
    });
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  };

  const handleSubmit = () => {
    const newItem = {
      title,
      price,
      category,
      condition,
      location,
<<<<<<< HEAD
      image,
=======
      images,
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
    };

    console.log('New Item: ', newItem);
    navigation.goBack();
  };

  return (
<<<<<<< HEAD
    <View style={styles.container}>
=======
    <ScrollView contentContainerStyle={styles.container}>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
      <Text style={styles.header}>Add a New Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
<<<<<<< HEAD
      />
      
=======
        keyboardType="numeric"
      />

>>>>>>> 020c6d6 (Initial commit of ListifyApp)
      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Condition"
        value={condition}
        onChangeText={setCondition}
      />

<<<<<<< HEAD
      {/* Location Input (Google Maps) */}
      <View style={styles.mapContainer}>
        <MapView
=======
      {/* Search Bar for Address */}
      <TextInput
        style={styles.input}
        placeholder="Search Address"
        value={address}
        onChangeText={setAddress}
        onSubmitEditing={() => searchAddress(address)}
      />

      {/* Location Input (Google Maps) */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
          style={styles.map}
          initialRegion={{
            latitude: 24.8607,
            longitude: 67.0011,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleLocationChange}
        >
          {location && location.latitude && location.longitude && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          )}
        </MapView>
      </View>

<<<<<<< HEAD
=======
      {/* Image Selection and Display */}
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImagesFromGallery}>
          <Text style={styles.buttonText}>Select Images</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((imgUri, index) => (
            <Image key={index} source={{ uri: imgUri }} style={styles.selectedImage} />
          ))}
        </ScrollView>
      </View>

>>>>>>> 020c6d6 (Initial commit of ListifyApp)
      {device && (
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

<<<<<<< HEAD
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
=======
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  );
};

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
=======
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  },
  mapContainer: {
    height: 250,
    marginBottom: 20,
<<<<<<< HEAD
=======
    borderRadius: 15,
    overflow: 'hidden',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  },
  map: {
    flex: 1,
  },
  camera: {
    height: 250,
    marginBottom: 20,
<<<<<<< HEAD
  },
  cameraButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
=======
    borderRadius: 15,
    overflow: 'hidden',
  },
  cameraButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
<<<<<<< HEAD
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 20,
=======
  selectedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePickerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    width: '60%',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
<<<<<<< HEAD
    padding: 15,
    alignItems: 'center',
  },
});

export default AddItem;
=======
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
});

export default AddItem;
>>>>>>> 020c6d6 (Initial commit of ListifyApp)

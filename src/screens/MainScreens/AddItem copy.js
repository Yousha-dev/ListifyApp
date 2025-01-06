import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import { categories } from '../../data/categories';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const mapRef = useRef(null);

  // Use camera hooks
  const devices = useCameraDevices();
  const device = devices.back;
  const { hasPermission } = useCameraPermission();

  useEffect(() => {
    const initializeGeocoder = () => {
      Geocoder.init('AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk');
    };

    initializeGeocoder();
  }, []);

  const handleLocationChange = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    getLocationAddress(latitude, longitude);
  };

  const getLocationAddress = (lat, long) => {
    Geocoder.from(lat, long)
      .then((json) => {
        const address = json.results[0].formatted_address;
        setAddress(address);
        setLocation((prevLocation) => ({
          ...prevLocation,
          address,
        }));
      })
      .catch((error) => console.warn(error));
  };

  const searchAddress = async (query) => {
    if (query) {
      try {
        const response = await Geocoder.from(query);
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
        setAddress(query);

        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            1000
          );
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
    const photo = await cameraRef.current.takePhoto({
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
    })
      .then((selectedImages) => {
        const imageUris = selectedImages.map((image) => image.path);
        setImages((prevImages) => [...prevImages, ...imageUris]);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleSubmit = () => {
    const newItem = {
      title,
      price,
      category,
      condition,
      location,
      images,
    };

    console.log('New Item: ', newItem);
    navigation.goBack();
  };

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Camera permission is required.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        keyboardType="numeric"
      />

      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
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
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
          )}
        </MapView>
      </View>

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

      {device && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // styles unchanged
});

export default AddItem;

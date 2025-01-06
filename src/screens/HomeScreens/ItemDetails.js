import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk'); // Replace with your actual Google API key

const ItemDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically fetch latitude and longitude for the location
    Geocoder.from(item.location)
      .then(json => {
        const location = json.results[0]?.geometry?.location;
        if (location) {
          setCoordinates({ latitude: location.lat, longitude: location.lng });
        } else {
          console.warn("No results found for the provided location.");
          fallbackCoordinates();
        }
      })
      .catch(error => {
        console.warn("Geocoding error: ", error);
        fallbackCoordinates();
      })
      .finally(() => setLoading(false));
  }, [item.location]);

  const fallbackCoordinates = () => {
    // Default to Karachi center or another meaningful location
    setCoordinates({ latitude: 24.8607, longitude: 67.0011 });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Item Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Item Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Price and Condition */}
      <View style={styles.priceConditionContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.condition}>Condition: {item.condition}</Text>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>Location:</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>

      {/* Map */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.map} />
      ) : (
        coordinates && (
          <MapView
            style={styles.map}
            region={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={coordinates}
              title={item.title}
            />
          </MapView>
        )
      )}

      {/* Bid Button */}
      <TouchableOpacity
        style={styles.bidButton}
        onPress={() => navigation.navigate('ItemBid', { itemId: item.id })}
      >
        <Text style={styles.bidButtonText}>Place a Bid</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceConditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  price: {
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: 'gray',
  },
  locationContainer: {
    marginBottom: 15,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  map: {
    width: '100%',
    height: 250,
    marginVertical: 20,
  },
  bidButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemDetails;

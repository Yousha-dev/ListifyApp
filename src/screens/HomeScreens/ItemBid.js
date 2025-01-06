// src/screens/HomeScreens/ItemBid.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { bids } from '../../data/bids'; // Import bids data
import { items } from '../../data/items'; // Import item data
import { useNavigation, useRoute } from '@react-navigation/native';

const ItemBid = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Get the selected item ID from the route params
  const { itemId } = route.params;

  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [currentBids, setCurrentBids] = useState([]);

  useEffect(() => {
    // Fetch the item details using the itemId
    const selectedItem = items.find((item) => item.id === itemId);
    setItem(selectedItem);

    // Fetch the bids for this item
    const itemBids = bids.find((bid) => bid.itemId === itemId);
    if (itemBids) {
      setCurrentBids(itemBids.bids);
    }
  }, [itemId]);

  // Handle bid submission
  const handleBid = () => {
    if (!bidAmount || isNaN(bidAmount) || parseInt(bidAmount) <= 0) {
      Alert.alert('Invalid bid', 'Please enter a valid bid amount.');
      return;
    }

    // Add new bid to the current bids
    const newBid = {
      bidId: `b${currentBids.length + 1}`,
      bidder: 'Current User',  // Replace with actual user name
      bidAmount: `${bidAmount} rupees`,
      timestamp: new Date().toISOString(),
    };

    // Update bids data
    const updatedBids = [...currentBids, newBid];
    setCurrentBids(updatedBids);

    // Update bids in the bids data (to be handled by state or database in a real app)
    // This could be done via an API call to update backend data.

    // Clear bid input
    setBidAmount('');
    Alert.alert('Bid Placed', `Your bid of ${bidAmount} rupees has been placed.`);
  };

  if (!item) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Item Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
      </View>

      {/* Bid Input */}
      <View style={styles.bidSection}>
        <Text style={styles.bidLabel}>Enter Your Bid:</Text>
        <TextInput
          style={styles.bidInput}
          placeholder="Enter bid amount"
          keyboardType="numeric"
          value={bidAmount}
          onChangeText={setBidAmount}
        />
        <Button title="Place Bid" onPress={handleBid} />
      </View>

      {/* Existing Bids */}
      <View style={styles.bidsSection}>
        <Text style={styles.bidsTitle}>Current Bids:</Text>
        <FlatList
          data={currentBids}
          keyExtractor={(item) => item.bidId}
          renderItem={({ item }) => (
            <View style={styles.bidItem}>
              <Text style={styles.bidder}>{item.bidder}:</Text>
              <Text style={styles.bidAmount}>{item.bidAmount}</Text>
              <Text style={styles.bidTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemDetails: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 18,
    color: 'green',
  },
  itemLocation: {
    fontSize: 16,
    color: 'gray',
  },
  bidSection: {
    marginVertical: 20,
  },
  bidLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  bidInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bidsSection: {
    marginTop: 30,
  },
  bidsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bidItem: {
    marginBottom: 15,
  },
  bidder: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bidAmount: {
    fontSize: 16,
    color: 'blue',
  },
  bidTimestamp: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ItemBid;

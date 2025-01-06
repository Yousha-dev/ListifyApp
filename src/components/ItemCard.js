import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ItemCard = ({ styles, item, onItemPress, onContactPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onItemPress(item)}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <Text style={styles.cardLocation}>
        <Icon name="location-on" size={14} color="#666" /> {item.location}
      </Text>
      <Text style={styles.cardCondition}>Condition: {item.condition}</Text>
      <Text style={styles.cardSeller}>Seller: {item.seller}</Text>
      <View style={styles.cardButtonsContainer}>
        <TouchableOpacity style={styles.cardButton} onPress={() => onContactPress(item.seller)}>
          <Icon name="call" size={20} color="#fff" />
          <Text style={styles.cardButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default ItemCard;

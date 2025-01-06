import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const Header = ({ styles }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Listify</Text>
    <TouchableOpacity>
      <Image
        source={require('../assets/icons/shopping-cart.png')}
        style={{ width: 28, height: 28, tintColor: '#fff' }} 
      />
    </TouchableOpacity>
  </View>
);

export default Header;

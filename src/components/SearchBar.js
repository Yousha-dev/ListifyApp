import React from 'react';
import { View, TextInput, Image } from 'react-native';

const SearchBar = ({ styles, search, onSearchChange }) => (
  <View style={styles.searchContainer}>
    <Image
      source={require('../assets/icons/search.png')} 
      style={[styles.searchIcon, { width: 10, height: 10 }]} 
    />
    <TextInput
      style={styles.searchBar}
      placeholder="Search items..."
      placeholderTextColor="#aaa"
      value={search}
      onChangeText={onSearchChange}
    />
  </View>
);

export default SearchBar;

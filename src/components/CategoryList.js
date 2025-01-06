import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const CategoryList = ({ styles, categories, selectedCategory, onSelectCategory }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
    {categories.map((category) => (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryButton,
          selectedCategory === category.name && styles.categoryButtonActive,
        ]}
        onPress={() => onSelectCategory(category.name)}
      >
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategory === category.name && styles.categoryButtonTextActive,
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default CategoryList;

import React, { useState } from 'react'; 
import { FlatList } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryList from '../../components/CategoryList';
import ItemCard from '../../components/ItemCard';
import EmptyList from '../../components/EmptyList';
import { categories } from '../../data/categories';
import { items as itemList } from '../../data/items';
import styles from '../../styles/styles';

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');

  const filteredItems = itemList.filter(
    (item) =>
      (!selectedCategory || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FlatList
      data={filteredItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
          styles={styles}
          item={item}
          onItemPress={() => navigation.navigate('ItemDetails', { item })} 
<<<<<<< HEAD
          onContactPress={() => navigation.navigate('ChatStack')} // Navigate to the Chat tab
=======
          onContactPress={() => navigation.navigate('ChatStack')} 
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        />
      )}
      ListHeaderComponent={
        <>
          <Header styles={styles} />
          <SearchBar
            styles={styles}
            search={search}
            onSearchChange={(text) => setSearch(text)}
          />
          <CategoryList
            styles={styles}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(name) => setSelectedCategory(name === selectedCategory ? null : name)}
          />
        </>
      }
      ListEmptyComponent={<EmptyList styles={styles} />}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default Home;

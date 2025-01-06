import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9fafb', // Soft light background
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#2563eb', // Vibrant blue header
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    headerText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
      letterSpacing: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      marginVertical: 20,
      backgroundColor: '#fff',
      borderRadius: 25,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      paddingHorizontal: 15,
    },
    searchIcon: {
      padding: 10,
      color: '#6b7280',
    },
    searchBar: {
      flex: 1,
      height: 45,
      fontSize: 16,
      color: '#374151',
    },
    categoryContainer: {
      marginVertical: 20,
      paddingHorizontal: 15,
      flexDirection: 'row',
    },
    categoryButton: {
      backgroundColor: '#e2e8f0',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: '#cbd5e1',
      transition: 'transform 0.3s ease', // Hover effect
    },
    categoryButtonActive: {
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
      transform: [{ scale: 1.1 }], // Slightly enlarged for active state
    },
    categoryButtonText: {
      fontSize: 15,
      color: '#475569',
      fontWeight: '500',
    },
    categoryButtonTextActive: {
      color: '#fff',
      fontWeight: '700',
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 15,
      marginHorizontal: 15,
      marginVertical: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      overflow: 'hidden',
      transition: 'all 0.3s ease', // Smooth animations for hover
    },
    cardImage: {
      width: 140,
      height: 140,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
    cardContent: {
      flex: 1,
      padding: 15,
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#374151',
      marginBottom: 8,
    },
    cardPrice: {
      fontSize: 16,
      color: '#16a34a', // Subtle green for price
      fontWeight: 'bold',
    },
    cardLocation: {
      fontSize: 14,
      color: '#6b7280',
      marginBottom: 5,
    },
    cardCondition: {
      fontSize: 14,
      color: '#4b5563',
      fontStyle: 'italic',
    },
    cardSeller: {
      fontSize: 14,
      color: '#1f2937',
    },
    cardButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    cardButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2563eb',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      flex: 1, // Equal-sized buttons
      marginRight: 10, // Spacing between buttons
      elevation: 3,
      shadowColor: '#2563eb',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    cardButtonText: {
      color: '#fff',
      fontSize: 16, // Larger text
      fontWeight: '600',
      marginLeft: 6,
    },
    favoriteButton: {
      backgroundColor: '#f43f5e', // Soft red for the favorite button
    },
    emptyText: {
      textAlign: 'center',
      color: '#9ca3af',
      marginTop: 30,
      fontSize: 16,
      fontStyle: 'italic',
    },
  });

export default styles;

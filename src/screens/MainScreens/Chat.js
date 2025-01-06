import React from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { chats } from '../../data/chats'; // Mockup chats data
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();

  const renderChatItem = ({ item }) => {
    const { itemTitle, lastMessage, lastTimestamp, unreadMessages, chatId } = item;
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatDetails', { chatId })}
      >
        <View style={styles.chatContent}>
          <Text style={styles.itemTitle}>{itemTitle}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
          <Text style={styles.timestamp}>{new Date(lastTimestamp).toLocaleString()}</Text>
        </View>
        {unreadMessages > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{unreadMessages}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.chatId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    color: '#555',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  unreadBadge: {
    backgroundColor: '#ff5252',
    borderRadius: 12,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;

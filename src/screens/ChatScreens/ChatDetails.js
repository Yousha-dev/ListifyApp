import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { chats } from '../../data/chats'; // Mockup chats data
import { useRoute } from '@react-navigation/native';
import { ProfileContext } from '../../context/ProfileContext'; // Import ProfileContext

const ChatDetails = () => {
  const route = useRoute();
  const { chatId } = route.params;

  const { profile } = useContext(ProfileContext); // Access user's profile from context
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(chats.find(chat => chat.chatId === chatId));

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        messageId: Date.now().toString(),
        senderId: 'user', // Assuming the user sends messages
        message,
        timestamp: new Date().toISOString(),
      };
      const updatedChat = { ...chat, messages: [...chat.messages, newMessage] };
      setChat(updatedChat);
      setMessage('');
    }
  };

  const renderMessageItem = ({ item }) => {
    const isUserMessage = item.senderId === 'user';
    return (
      <View
        style={[styles.messageContainer, isUserMessage ? styles.userMessageContainer : styles.sellerMessageContainer]}
      >
        {!isUserMessage && (
          <Image source={require('../../assets/images/dp.png')} style={styles.sellerLogo} />
        )}
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
        </View>
        {isUserMessage && (
          <Image
            source={{ uri: profile.image || '../../assets/images/dp.png' }} // Fallback if no image
            style={styles.userLogo}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chat.messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.messageId}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  sellerMessageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2f95dc',
    marginBottom: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#2f95dc',
    borderRadius: 8,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sellerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default ChatDetails;

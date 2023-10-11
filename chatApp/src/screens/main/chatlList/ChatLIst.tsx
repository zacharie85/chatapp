// ChatList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRooms } from '../../../redux/actions/Messages';
import { useNavigation } from '@react-navigation/native';
import socket from '../../../utils/Socket';

const ChatList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const chatRooms = useSelector((state) => state.message.chatRooms);
  const error = useSelector((state) => state.message.error);
  const token = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {

    if (token) {
      dispatch(fetchChatRooms(token));
    }

    // Connect to the Socket.io server
    socket.connect();
    // Listen for chat room updates
    socket.on('connection', () => {
      // Fetch chat rooms again when an update is received
      console.log('client connected');
      //fetchChatRooms(token);
    });

    return () => {
      // Disconnect the Socket.io connection when the component unmounts
      socket.disconnect();
    };
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchChatRooms(token).then(() => setRefreshing(false));
  };

  const navigateToChatRoom = (chatRoom) => {
    navigation.navigate('ChatRoom', { chatRoom });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat Rooms</Text>
      {error ? (
        <Text style={styles.errorText}>Error loading chat rooms. Please try again.</Text>
      ) : (
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => navigateToChatRoom(item)}
            >
              <Text style={styles.chatName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Image, Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRooms, getCurrentUser } from '../../../redux/actions/Messages';
import { useNavigation } from '@react-navigation/native';
import socket from '../../../utils/Socket';
import { staticAvatarImageUrl } from '../../../utils/uri';

const ChatList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const chatRooms = useSelector((state) => state.message.chatRooms);
  const error = useSelector((state) => state.message.error);
  const token = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {

    if (token) {
      dispatch(fetchChatRooms(token)).then(() => setRefreshing(false));
      dispatch(getCurrentUser(token));
    }

    // Listen for chat room updates
    socket.on('chatRoomUpdate', () => {
      console.log('chatRoomUpdate')
      // Fetch chat rooms again when an update is received
      dispatch(fetchChatRooms(token));
    });

    return () => {
      // Disconnect the Socket.io connection and remove listeners when the component unmounts
      socket.disconnect();
      socket.off('chatRoomUpdate');
    };
  }, [socket]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchChatRooms(token)).then(() => setRefreshing(false));
  };

  const navigateToChatRoom = (chatRoom) => {
    navigation.navigate('ChatRoomScreen', { isCreated: false, chatRoom });
  };

  if (refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25d366" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Create Room"
        onPress={() => {
          navigation.navigate('Users');
        }}
      />
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
              <Image source={{ uri: staticAvatarImageUrl }} style={styles.chatAvatar} />
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.chatRoom.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
              </View>
              <Text style={styles.messageTime}>{item.messageTime}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: '#777',
  },
  messageTime: {
    fontSize: 14,
    color: '#777',
  },
});
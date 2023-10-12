import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../../../redux/actions/Messages';
import socket from '../../../utils/Socket';
import { SEND_MESSAGE_SUCCESS } from '../../../redux/constant';

const ChatRoomScreen = ({ navigation, route }) => {

    const isCreated = route.params?.isCreated;
    const currentUser = useSelector((state) => state.message.currentUser);
    const messages = useSelector((state) => state.message.messages);
    const errorMessage = useSelector((state) => state.message.error);
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState('');
    const token = useSelector((state) => state.auth.user);
    const [chatId, setChatId] = useState('');
    const [receiverId, setReceiverId] = useState('');

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;
        let messageData = {};
        if (isCreated === true) {
            messageData = {
                chatId,
                text: inputText,
                receiverId
            }
        } else {
            messageData = {
                chatId,
                text: inputText
            }
        }

        if (inputText) {
            dispatch(sendMessage(messageData, token));
            setInputText('');
        } else {
            Alert.alert('Message cannot be empty');
        }
    };

    // Fetch messages when the component mounts
    useEffect(() => {
        if (isCreated === true) {
            const chatIdL = route.params?.chatId;
            const receiverIdL = route.params?.user._id;
            setReceiverId(receiverIdL);
            setChatId(chatIdL);
        } else {
            const chatIdL = route.params?.chatRoom.chatRoom._id;
            const userId = currentUser._id;
            socket.emit('join-room', chatIdL, userId);
            if (token) {
                dispatch(getMessages(chatIdL, token));
            }
            setChatId(chatIdL);
        }
    }, [chatId]);

    useEffect(() => {

        socket.on('send-message', (newMessage: any) => {
            // Handle the received message here
            console.log('Received new message:', newMessage);
            dispatch({ type: SEND_MESSAGE_SUCCESS, payload: newMessage });
        });

        socket.on('online-users', (onlineUsers: any) => {
            // Handle the received message here
            console.log('onlineUsers:', onlineUsers);
        });

        return () => {
            socket.off('message');
        };

    }, [socket]);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={item.sender === currentUser._id ? styles.userMessageContainer : styles.otherMessageContainer}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 16,
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#009688',
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 12,
        maxWidth: '70%',
    },
    otherMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#071e26',
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 12,
        maxWidth: '70%',
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    sendButton: {
        padding: 8,
        backgroundColor: '#009688',
        borderRadius: 8,
        marginLeft: 8,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
});

export default ChatRoomScreen;

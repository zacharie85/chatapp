// UserList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { staticAvatarImageUrl } from '../../../utils/uri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchUsers } from '../../../redux/actions/UserActions';

const UserList = () => {

    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const token = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.users.users);

    useEffect(() => {

        if (token) {
            dispatch(fetchUsers(token)).then(() => setRefreshing(false));
        }

        return () => {
            null
        };

    }, []);

    if (refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#25d366" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={userData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => {
                            navigation.navigate('ChatRoomScreen', { isCreated: true, chatId: '6524afe7d6ef1696e3e1fa93', user: item });
                        }}
                    >
                        <Image source={{ uri: staticAvatarImageUrl }} style={styles.profilePicture} />
                        <Text style={styles.username}>{item.username}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        fontSize: 18,
        marginLeft: 12,
    },
});

export default UserList;

// AuthenticatedNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/main/chatlList/ChatLIst'; // Replace with your authenticated screen component
import UserList from '../screens/main/userllist/UserList';

const Stack = createStackNavigator();

const AuthenticatedNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Users" component={UserList} />
            {/* Add more screens for your authenticated flow */}
        </Stack.Navigator>
    );
};

export default AuthenticatedNavigator;

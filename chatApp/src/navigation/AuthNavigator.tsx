// AuthenticatedNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/register/RegisterScren';
import LoginScreen from '../screens/authentification/AuthScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#1877f2', // Set your custom background color
                    },
                    headerTitle: 'Login', // Set the title here
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#1877f2', // Set your custom background color
                    },
                    headerTitle: 'Registration', // Set the title here
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
            />
            {/* Add more screens as needed */}
        </Stack.Navigator>
    );
};

export default AuthNavigator;

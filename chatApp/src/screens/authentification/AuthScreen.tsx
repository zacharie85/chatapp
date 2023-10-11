// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/RegisterActions';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
    const dispatch = useDispatch();
    const loginError = useSelector((state) => state.auth.error);
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false); // Track loading state

    const handleLogin = async () => {
      setLoading(true); // Set loading to true when login starts
      try {
        await dispatch(loginUser(credentials));
      } finally {
        setLoading(false); // Set loading to false when login finishes
      }
    };
  

    const handleSignUp = () => {
        navigation.navigate('Registration'); // Navigate to the registration screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log In</Text>
            <TextInput
                placeholder="Email or Username"
                style={styles.textInput}
                onChangeText={(text) => setCredentials({ ...credentials, username: text })}
            />
            <TextInput
                placeholder="Password"
                style={styles.textInput}
                secureTextEntry
                onChangeText={(text) => setCredentials({ ...credentials, password: text })}
            />
            <TouchableOpacity
                style={[styles.loginButton, { opacity: loading ? 0.5 : 1 }]} // Reduce opacity when loading
                onPress={handleLogin}
                disabled={loading} // Disable the button when loading
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" /> // Show loading indicator
                ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
            {loginError && <Text style={styles.error}>{loginError}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#1877f2', // Facebook blue color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    signUpButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent', // Transparent background
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#1877f2', // Facebook blue color
    },
    signUpButtonText: {
        color: '#1877f2', // Facebook blue color
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;

// RegistrationScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/RegisterActions';
import { RegistrationSuccessMessage } from '../../components/Index';

const RegistrationScreen: React.FC = () => {
    const dispatch = useDispatch();
    const registrationError = useSelector((state) => state.auth.error);
    const registrationSuccess = useSelector((state) => state.auth.user !== null); // Check if user is registered successfully

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleRegistration = () => {
        dispatch(registerUser(userData));
    };

    return (
        <View style={styles.container}>
            {registrationSuccess && <RegistrationSuccessMessage />}
                <TextInput
                    placeholder="Username"
                    style={styles.textInput}
                    onChangeText={(text) => setUserData({ ...userData, username: text })}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    secureTextEntry
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
                <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            {registrationError && <Text style={styles.error}>{registrationError}</Text>}
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
    error: {
        color: 'red',
        marginTop: 10,
    },
    registerButton: {
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
});

export default RegistrationScreen;

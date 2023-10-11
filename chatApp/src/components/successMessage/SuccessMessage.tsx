// RegistrationSuccessMessage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegistrationSuccessMessage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Registration successful!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00C300', // Facebook green color
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationSuccessMessage;

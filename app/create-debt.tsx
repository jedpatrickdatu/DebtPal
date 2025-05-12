import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateDebt = () => {
  const [debtor, setDebtor] = useState('');
  const [amount, setAmount] = useState('0');

  const createDebt = async (debt: any) => {
    const jsonDebts = await AsyncStorage.getItem("DebtPal");
    const storageDebts = jsonDebts != null ? JSON.parse(jsonDebts) : null;
    const savedDebts = storageDebts && storageDebts.length ? storageDebts : [];

    const jsonValue = JSON.stringify([...savedDebts, {id: getUUID(), debtor, amount,}]);
    await AsyncStorage.setItem("DebtPal", jsonValue);
  }

  const getUUID = (): string => {
    return Date.now().toString(36);
  }
  return (
    <View style={styles.container}>
        <TextInput
            placeholder="Name"
            style={styles.input}
            placeholderTextColor="gray"
            value={debtor}
            onChangeText={setDebtor}
        />
        <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="gray"
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
        />
        <Button onPress={createDebt} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  createDebtButton: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CreateDebt;
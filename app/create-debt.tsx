import { View, Text, StyleSheet, Pressable, Platform, ScrollView, TextInput, Appearance } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from '@/constants/Colors';
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext } from '@/context/ThemeContext';
import Octicons from '@expo/vector-icons/Octicons';
import Animated, { LinearTransition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateDebt() {
  const Container = Platform.OS === 'web' ? ScrollView : GestureHandlerRootView;
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const [debtor, setDebtor] = useState('');
  const [amount, setAmount] = useState('0');
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  const styles = createStyles(theme, colorScheme);
  
  if (!loaded && !error) {
    return null;
  }

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
    <Container style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Debtor name"
          placeholderTextColor="gray"
          value={debtor}
          onChangeText={setDebtor}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="gray"
          keyboardType='numeric'
          value={amount}
          onChangeText={setAmount}
        />
        <Pressable onPress={createDebt} style={styles.addButton}>
          <Text style={styles.addButtonText}>Create</Text>
        </Pressable>
        <Pressable
          onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          style={{ marginLeft: 10 }}
        >
          {colorScheme === 'dark' ?
            <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} /> :
            <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />
          }
        </Pressable>
      </View>
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    input: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 0,
      color: theme.text,
      fontFamily: 'Inter_500Medium',
    },
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
    }
  });
}
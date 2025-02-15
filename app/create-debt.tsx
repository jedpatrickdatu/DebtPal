import { View, Text, StyleSheet, Pressable, Platform, ScrollView, TextInput, Appearance } from 'react-native'
import { useState } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from '@/constants/Colors';
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

export default function CreateDebt() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === 'web' ? ScrollView : GestureHandlerRootView;

  const [debtorName, setDebtorName] = useState('');
  const [amount, setAmount] = useState(0);
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });
  
  if (!loaded && !error) {
    return null;
  }
  
  const createDebt = (debt: any) => {
  }

  return (
    <Container style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Debtor name"
          placeholderTextColor="gray"
          value={debtorName}
          onChangeText={setDebtorName}
        />
        <Pressable onPress={createDebt} style={styles.addButton}>
          <Text style={styles.addButtonText}>Create</Text>
        </Pressable>
      </View>
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: 'black',
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
      color: 'white',
      fontFamily: 'Inter_500Medium',
    },
    addButton: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: 'black',
    }
  });
}
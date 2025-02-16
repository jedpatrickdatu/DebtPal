import { View, Text, StyleSheet, Pressable, Platform, ScrollView, TextInput, Appearance } from 'react-native'
import { useState, useContext } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from '@/constants/Colors';
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext } from '@/context/ThemeContext';
import Octicons from '@expo/vector-icons/Octicons';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function CreateDebt() {
  const Container = Platform.OS === 'web' ? ScrollView : GestureHandlerRootView;
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const [debtorName, setDebtorName] = useState('');
  const [amount, setAmount] = useState(0);
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  const styles = createStyles(theme, colorScheme);
  
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
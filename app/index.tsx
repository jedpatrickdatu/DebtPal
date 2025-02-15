import { View, Text, StyleSheet, Pressable, Platform, ScrollView, Image, Appearance } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import { GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { debtsData } from '@/data/Debts';
import { Colors } from '@/constants/Colors';

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const DebtContainer = Platform.OS === 'web' ? ScrollView : GestureHandlerRootView;

  const [debts, setDebts] = useState(debtsData.sort((a: any, b: any) => b.id - a.id));
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }

  const addDebt = (debt: any) => {
    setDebts([...debts, debt]);
  }

  const app = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>DebtPal</Text>
        <Link href="/menu" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Menuz</Text>
          </Pressable>
        </Link>
        <Link href="/create-debt" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Create Debt</Text>
          </Pressable>
        </Link>
        <DebtContainer>
            <FlatList
                data={debts}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                // ItemSeparatorComponent={separatorComp}
                // ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footer}
                ListEmptyComponent={<Text>No items</Text>}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.menuTextRow}>
                            <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.amount}</Text>
                        </View>
                        {/* <Image
                            source={MENU_IMAGES[item.id - 1]}
                            style={styles.menuImage}
                        /> */}
                    </View>
                )}
            />
        </DebtContainer>
      </View>
    )
  }
}

function createStyles(theme, colorScheme) {
return StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 120,
  },
  button: {
    height: 60,
    width: 150,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 6,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 12,
    backgroundColor: theme.background,
  },
  separator: {
      height: 1,
      backgroundColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
      width: '50%',
      maxWidth: 300,
      marginHorizontal: 'auto',
      marginBottom: 10
  },
  footer: {
      marginHorizontal: 'auto',
  },
  row: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: 600,
      height: 100,
      marginBottom: 10,
      borderStyle: 'solid',
      borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
      borderWidth: 1,
      borderRadius: 20,
      overflow: 'hidden',
      marginHorizontal: 'auto',
  },
  menuTextRow: {
      width: '65%',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
  },
  menuItemTitle: {
      fontSize: 18,
      textDecorationLine: 'underline',
  },
  menuItemText: {
      color: theme.text, 
  },
  menuImage: {
      width: 100,
      height: 100,
  }
});
}
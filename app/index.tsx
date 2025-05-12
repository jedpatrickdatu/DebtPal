import { View, Text, StyleSheet, Pressable, Platform, ScrollView, Image, Appearance, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { useState, useEffect } from 'react'
import { GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { debtsData } from '@/data/Debts';
import { Colors } from '@/constants/Colors';
// import { CreateDebt } from '@/constants/Colors';
import Animated, { LinearTransition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateDebt from './create-debt';

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const DebtContainer = Platform.OS === 'web' ? ScrollView : GestureHandlerRootView;

  const [debts, setDebts] = useState([]);
  const [isCreateDebtFormVisible, setIsCreateDebtFormVisible] = useState(false);
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("DebtPal");
        const storageDebts = jsonValue != null ? JSON.parse(jsonValue) : null;

        const debtDataToUse = storageDebts && storageDebts.length ? storageDebts : debtsData;
        setDebts(debtDataToUse.sort((a: any, b: any) => b.id - a.id));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [debtsData]);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(debts);
        await AsyncStorage.setItem("DebtPal", jsonValue);
      } catch (e) {
        console.error(e);
      }
    }

    storeData();
  }, [debts]);

  if (!loaded && !error) {
    return null;
  }

  const deleteDebt = async (debtId: string) => {
    const jsonDebts = await AsyncStorage.getItem("DebtPal");
    const storageDebts = jsonDebts != null ? JSON.parse(jsonDebts) : null;
    const savedDebts = storageDebts && storageDebts.length ? storageDebts : [];

    const updatedDebts = savedDebts.filter((debt => debt.id !== debtId));
    const jsonValue = JSON.stringify(updatedDebts);
    setDebts(updatedDebts);

    await AsyncStorage.setItem("DebtPal", jsonValue);
  };

  const renderDebtListItem = ({ item }) => (
    <View style={styles.row}>
        <View style={styles.menuTextRow}>
            <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.debtor}</Text>
            <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.amount}</Text>
            <Pressable onPress={() => deleteDebt(item.id)}>
              <MaterialCommunityIcons name="delete-circle" size={24} color="black" />
            </Pressable>
        </View>
        {/* <Image
            source={MENU_IMAGES[item.id - 1]}
            style={styles.menuImage}
        /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>DebtPal</Text>
      {/* <Link href="/menu" style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Menuz</Text>
        </Pressable>
      </Link> */}
      <DebtContainer>
          <Animated.FlatList
              data={debts}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              // ItemSeparatorComponent={separatorComp}
              // ListFooterComponent={footerComp}
              ListFooterComponentStyle={styles.footer}
              ListEmptyComponent={<Text>No items</Text>}
              itemLayoutAnimation={LinearTransition}
              keyboardDismissMode="on-drag"
              renderItem={renderDebtListItem}
              // renderItem={({ item }) => (
              //     <View style={styles.row}>
              //         <View style={styles.menuTextRow}>
              //             <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.debtor}</Text>
              //             <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.amount}</Text>
              //         </View>
              //         {/* <Image
              //             source={MENU_IMAGES[item.id - 1]}
              //             style={styles.menuImage}
              //         /> */}
              //     </View>
              // )}
          />
          {/* <TouchableOpacity style={styles.createDebtButton} onPress={() => setIsCreateDebtFormVisible(true)}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity> */}
          {/* <View style={styles.createDebtButton}>
          </View> */}
      </DebtContainer>
      <Link href="/create-debt" asChild>
        <TouchableOpacity style={styles.createDebtButton}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Link>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  )
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
}
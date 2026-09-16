import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

type ListaStack = {
  NavegadorDrawer: undefined;
  Detalles: undefined;
};

const Stack = createNativeStackNavigator<ListaStack>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="NavegadorDrawer" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="NavegadorDrawer" component={DrawerNavigator} />
          <Stack.Screen
            name="Detalles"
            component={ChestDetailScreen}
            options={{ title: 'Detalles', headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import { RoutineProvider } from './src/context/RoutineContext'
//import AddRoutineScreen from './src/screens/AddRoutineScreen';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from "./src/screens/AddRoutineScreen";

type ListaStack = {
  NavegadorDrawer: undefined;
  RoutineDetailScreen: { id: string };
  AddRoutineScreen:{id?:string|undefined};
};

const Stack = createNativeStackNavigator<ListaStack>();

export default function App() {
  return (
    <RoutineProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="NavegadorDrawer" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NavegadorDrawer" component={DrawerNavigator} />

            <Stack.Screen name="RoutineDetailScreen" 
            component={RoutineDetailScreen} 
            options={{ title: 'Detalles', headerShown: true }}
            />
             <Stack.Screen name="AddRoutineScreen" 
            component={AddRoutineScreen} 
            options={({route})=>({
              title: route.params?.id?'Editar rutina':'nueva Rutina'
            })}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </RoutineProvider>
  );
}
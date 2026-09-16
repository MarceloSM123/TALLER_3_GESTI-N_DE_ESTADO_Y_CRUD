import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

type ListaDrawer={
    Configuración:undefined;
    "Mi Entrenamiento":undefined;
}

const Drawer=createDrawerNavigator<ListaDrawer>();

export default function DrawerNavigator(){
    return(
        <Drawer.Navigator //screenOptions={{headerShown:false}} esto borra la hamburgues del drawer
        >
            <Drawer.Screen 
            name="Configuración" 
            component={SettingsScreen}
            options={{title: 'Configuración',
                drawerIcon:(({color,size})=>(<Ionicons name="settings-outline" color={color} size={size} />))
            }}
            />

            <Drawer.Screen
            name='Mi Entrenamiento'
            component={TabNavigator}
            options={{title:'Mi Entrenamiento',
                drawerIcon:(({color,size})=>(<Ionicons name="barbell-outline" color={color} size={size}/>))
            }}
            />
        </Drawer.Navigator>
    )
}
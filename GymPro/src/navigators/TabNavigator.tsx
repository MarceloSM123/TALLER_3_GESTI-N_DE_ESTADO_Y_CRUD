import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

type Pestañas={
    Progreso:undefined;
    Rutinas:undefined;
}

const Tab=createBottomTabNavigator<Pestañas>();

export default function TabNavigator(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>   
            <Tab.Screen 
            name="Progreso" 
            component={ProgressScreen}
            options={{title:'Progreso',
            tabBarIcon:({color,size})=>(
                <Ionicons name="bar-chart" color={color} size={size} />
            )}}
            />
            <Tab.Screen 
            name="Rutinas" 
            component={RoutineListScreen}
            options={{title:'Rutinas',
            tabBarIcon:({color,size})=>(
                <Ionicons name="list" color={color} size={size} />
            )}}
            />
        </Tab.Navigator>
    )
}
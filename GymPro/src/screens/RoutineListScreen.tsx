import {Text,StyleSheet,Button,FlatList,TouchableOpacity,View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import React from 'react';


export default function RoutineListScreen({navigation}:any) {
    const {routines,deleteRoutine}=useRoutines();
    return(
        <SafeAreaView style={Ventana.container}>
       <View>
        <TouchableOpacity onPress={()=>navigation.navigate('AddRoutineScreen')}>
<Ionicons name='add' size={30} color="blue"></Ionicons>
        </TouchableOpacity>
       </View>
       <FlatList data={routines}
       keyExtractor={(item)=>item.id}
renderItem={
    ({item})=>{
        return(
            <View>
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.muscleGroup}</Text>
                    <Text>{item.duration} min</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navegate('RoutineDetailScreen')}>
                        <Ionicons name='eye' size={30} color="Blue"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navegate('addRoutine',{id:item.id})}>
                        <Ionicons name='pencil' size={30} color="Black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>deleteRoutine(item.id)}>
                        <Ionicons name='trash' size={30} color="red"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
       ></FlatList>
        </SafeAreaView>
    )
}

const Ventana=StyleSheet.create({
container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
},

title:{
     fontSize:20,
     fontWeight:'bold',
}
})
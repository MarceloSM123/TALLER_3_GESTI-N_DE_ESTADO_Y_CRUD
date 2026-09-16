import {Text,StyleSheet,Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RoutineListScreen({navigation}:any) {
    return(
        <SafeAreaView style={Ventana.container}>
            <Text style={Ventana.title}>Rutinas</Text>
            <Button title='Ver rutina de pecho' onPress={()=>navigation.navigate('Detalles')}
            />

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
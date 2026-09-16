import {Text,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProgressScreen() {
    return(
        <SafeAreaView style={Ventana.container}>
            <Text style={Ventana.title}>Progreso</Text>
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
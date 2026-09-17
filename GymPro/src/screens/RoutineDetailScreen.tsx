import {Text,StyleSheet,View,TouchableOpacity,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import React from 'react';

const COLORS = {
    primary: '#6C5CE7',
    background: '#F4F5FB',
    card: '#FFFFFF',
    textDark: '#1F2233',
    textMuted: '#8A8FA3',
};

const MUSCLE_COLORS: Record<string, string> = {
    Pecho: '#FF6B6B',
    Espalda: '#4A7DFF',
    Pierna: '#00C9A7',
    Hombro: '#FFA94D',
    'Bíceps': '#A55EEA',
    'Tríceps': '#FF8A5C',
    Abdomen: '#F2994A',
};

export default function RoutineDetailScreen({navigation, route}: any) {
    const {routines} = useRoutines();
    const routine = routines.find((r)=>r.id===route?.params?.id);

    if (!routine) {
        return (
            <SafeAreaView style={Ventana.container}>
                <View style={Ventana.header}>
                    <TouchableOpacity style={Ventana.backBtn} onPress={()=>navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={COLORS.textDark}/>
                    </TouchableOpacity>
                    <Text style={Ventana.title}>Rutina</Text>
                    <View style={Ventana.backBtn}/>
                </View>
                <View style={Ventana.empty}>
                    <Ionicons name="alert-circle-outline" size={44} color={COLORS.textMuted}/>
                    <Text style={Ventana.emptyTitle}>Rutina no encontrada</Text>
                    <TouchableOpacity style={Ventana.emptyBtn} onPress={()=>navigation.goBack()}>
                        <Text style={Ventana.emptyBtnText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const color = MUSCLE_COLORS[routine.muscleGroup] ?? COLORS.primary;

    return (
        <SafeAreaView style={Ventana.container}>
            <View style={Ventana.header}>
                <TouchableOpacity style={Ventana.backBtn} onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textDark}/>
                </TouchableOpacity>
                <Text style={Ventana.title}>Detalle de Rutina</Text>
                <View style={Ventana.backBtn}/>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={Ventana.content}>
                <View style={[Ventana.hero,{backgroundColor:`${color}1F`}]}>
                    <View style={[Ventana.avatar,{backgroundColor:color}]}>
                        <Text style={Ventana.avatarText}>{routine.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={Ventana.heroTitle}>{routine.name}</Text>
                    <View style={[Ventana.chip,{backgroundColor:`${color}33`}]}>
                        <Text style={[Ventana.chipText,{color:color}]}>{routine.muscleGroup}</Text>
                    </View>
                </View>

                <View style={Ventana.infoCard}>
                    <View style={Ventana.infoRow}>
                        <View style={Ventana.infoIcon}>
                            <Ionicons name="barbell-outline" size={20} color={COLORS.primary}/>
                        </View>
                        <View style={Ventana.infoText}>
                            <Text style={Ventana.infoLabel}>Grupo muscular</Text>
                            <Text style={Ventana.infoValue}>{routine.muscleGroup}</Text>
                        </View>
                    </View>
                    <View style={Ventana.divider}/>
                    <View style={Ventana.infoRow}>
                        <View style={Ventana.infoIcon}>
                            <Ionicons name="time-outline" size={20} color={COLORS.primary}/>
                        </View>
                        <View style={Ventana.infoText}>
                            <Text style={Ventana.infoLabel}>Duración</Text>
                            <Text style={Ventana.infoValue}>{routine.duration} minutos</Text>
                        </View>
                    </View>
                    <View style={Ventana.divider}/>
                    <View style={Ventana.infoRow}>
                        <View style={Ventana.infoIcon}>
                            <Ionicons name="calendar-outline" size={20} color={COLORS.primary}/>
                        </View>
                        <View style={Ventana.infoText}>
                            <Text style={Ventana.infoLabel}>Creada el</Text>
                            <Text style={Ventana.infoValue}>{routine.createdAt}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Ventana=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.background,
    },

    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:16,
        paddingTop:8,
        paddingBottom:8,
    },

    backBtn:{
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:COLORS.card,
        alignItems:'center',
        justifyContent:'center',
    },

    title:{
        fontSize:20,
        fontWeight:'800',
        color:COLORS.textDark,
    },

    content:{
        padding:20,
        paddingBottom:24,
    },

    hero:{
        alignItems:'center',
        paddingVertical:28,
        paddingHorizontal:16,
        borderRadius:20,
        marginBottom:16,
    },

    avatar:{
        width:72,
        height:72,
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:12,
    },

    avatarText:{
        fontSize:32,
        fontWeight:'800',
        color:'#FFFFFF',
    },

    heroTitle:{
        fontSize:20,
        fontWeight:'800',
        color:COLORS.textDark,
        textAlign:'center',
        marginBottom:10,
    },

    chip:{
        paddingHorizontal:14,
        paddingVertical:6,
        borderRadius:14,
    },

    chipText:{
        fontSize:13,
        fontWeight:'700',
    },

    infoCard:{
        backgroundColor:COLORS.card,
        borderRadius:16,
        paddingVertical:6,
        marginBottom:16,
        shadowColor:'#1F2233',
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.06,
        shadowRadius:8,
        elevation:3,
    },

    infoRow:{
        flexDirection:'row',
        alignItems:'center',
        padding:14,
    },

    infoIcon:{
        width:44,
        height:44,
        borderRadius:14,
        backgroundColor:'#EDEBFB',
        alignItems:'center',
        justifyContent:'center',
        marginRight:14,
    },

    infoText:{
        flex:1,
    },

    infoLabel:{
        fontSize:12,
        color:COLORS.textMuted,
    },

    infoValue:{
        fontSize:16,
        fontWeight:'700',
        color:COLORS.textDark,
        marginTop:2,
    },

    divider:{
        height:1,
        backgroundColor:'#EEF0F8',
        marginHorizontal:14,
    },

    empty:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:30,
    },

    emptyTitle:{
        fontSize:16,
        fontWeight:'700',
        color:COLORS.textDark,
        marginTop:12,
        marginBottom:16,
    },

    emptyBtn:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
        backgroundColor:COLORS.primary,
    },

    emptyBtnText:{
        color:'#FFFFFF',
        fontWeight:'700',
    },
})
import {Text,StyleSheet,FlatList,TouchableOpacity,View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import RoutineDetailsScreen from '../screens/RoutineDetailScreen'
import React from 'react';

const COLORS = {
    primary: '#6C5CE7',
    background: '#F4F5FB',
    card: '#FFFFFF',
    textDark: '#1F2233',
    textMuted: '#8A8FA3',
    danger: '#FF6B6B',
    edit: '#FFA94D',
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

export default function RoutineListScreen({navigation}:any) {
    const {routines,deleteRoutine}=useRoutines();
    return(
        <SafeAreaView style={Ventana.container}>
            <View style={Ventana.header}>
                <Text style={Ventana.title}>Mis Rutinas</Text>
                <Text style={Ventana.subtitle}>Organiza tu entrenamiento diario</Text>
            </View>

            <FlatList
                data={routines}
                keyExtractor={(item)=>item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Ventana.listContent}
                ListEmptyComponent={
                    <View style={Ventana.emptyState}>
                        <View style={Ventana.emptyIcon}>
                            <Ionicons name="barbell-outline" size={44} color={COLORS.primary}/>
                        </View>
                        <Text style={Ventana.emptyTitle}>Aún no tienes rutinas</Text>
                        <Text style={Ventana.emptyText}>Toca el botón + para crear tu primera rutina de entrenamiento.</Text>
                    </View>
                }
                renderItem={
                    ({item})=>{
                        const muscleColor = MUSCLE_COLORS[item.muscleGroup] ?? COLORS.primary;
                        return(
                            <View style={Ventana.card}>
                                <View style={[Ventana.avatar,{backgroundColor:`${muscleColor}22`}]}>
                                    <Text style={[Ventana.avatarText,{color:muscleColor}]}>
                                        {item.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>

                                <View style={Ventana.cardInfo}>
                                    <Text style={Ventana.cardTitle} numberOfLines={1}>{item.name}</Text>
                                    <View style={Ventana.cardMeta}>
                                        <View style={[Ventana.badge,{backgroundColor:`${muscleColor}1A`}]}>
                                            <Text style={[Ventana.badgeText,{color:muscleColor}]}>{item.muscleGroup}</Text>
                                        </View>
                                        <View style={Ventana.duration}>
                                            <Ionicons name="time-outline" size={14} color={COLORS.textMuted}/>
                                            <Text style={Ventana.durationText}>{item.duration} min</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={Ventana.actions}>
                                    <TouchableOpacity style={Ventana.actionBtn} onPress={()=>navigation.navigate('RoutineDetailScreen',{id:item.id})}>
                                        <Ionicons name="eye" size={18} color={COLORS.primary}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Ventana.actionBtn} onPress={()=>navigation.navigate('AddRoutineScreen',{id:item.id})}>
                                        <Ionicons name="pencil" size={18} color={COLORS.edit}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Ventana.actionBtn} onPress={()=>deleteRoutine(item.id)}>
                                        <Ionicons name="trash" size={18} color={COLORS.danger}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                }
            />

            <TouchableOpacity style={Ventana.fab} activeOpacity={0.85} onPress={()=>navigation.navigate('AddRoutineScreen')}>
                <Ionicons name="add" size={28} color="#FFFFFF"/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const Ventana=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.background,
    },

    header:{
        paddingHorizontal:20,
        paddingTop:12,
        paddingBottom:16,
    },

    title:{
        fontSize:28,
        fontWeight:'800',
        color:COLORS.textDark,
    },

    subtitle:{
        fontSize:14,
        color:COLORS.textMuted,
        marginTop:4,
    },

    listContent:{
        paddingHorizontal:20,
        paddingBottom:110,
    },

    card:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:COLORS.card,
        borderRadius:16,
        padding:14,
        marginBottom:12,
        shadowColor:'#1F2233',
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.06,
        shadowRadius:8,
        elevation:3,
    },

    avatar:{
        width:48,
        height:48,
        borderRadius:14,
        alignItems:'center',
        justifyContent:'center',
        marginRight:12,
    },

    avatarText:{
        fontSize:20,
        fontWeight:'800',
    },

    cardInfo:{
        flex:1,
        marginRight:8,
    },

    cardTitle:{
        fontSize:16,
        fontWeight:'700',
        color:COLORS.textDark,
    },

    cardMeta:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:6,
        flexWrap:'wrap',
    },

    badge:{
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:4,
        marginRight:8,
    },

    badgeText:{
        fontSize:12,
        fontWeight:'600',
    },

    duration:{
        flexDirection:'row',
        alignItems:'center',
    },

    durationText:{
        fontSize:12,
        color:COLORS.textMuted,
        marginLeft:4,
    },

    actions:{
        flexDirection:'row',
        gap:6,
    },

    actionBtn:{
        width:34,
        height:34,
        borderRadius:17,
        backgroundColor:COLORS.background,
        alignItems:'center',
        justifyContent:'center',
    },

    fab:{
        position:'absolute',
        right:20,
        bottom:24,
        width:56,
        height:56,
        borderRadius:28,
        backgroundColor:COLORS.primary,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:COLORS.primary,
        shadowOffset:{width:0,height:6},
        shadowOpacity:0.35,
        shadowRadius:12,
        elevation:6,
    },

    emptyState:{
        alignItems:'center',
        marginTop:80,
        paddingHorizontal:30,
    },

    emptyIcon:{
        width:84,
        height:84,
        borderRadius:42,
        backgroundColor:'#EDEBFB',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:16,
    },

    emptyTitle:{
        fontSize:18,
        fontWeight:'700',
        color:COLORS.textDark,
        marginBottom:6,
    },

    emptyText:{
        fontSize:14,
        color:COLORS.textMuted,
        textAlign:'center',
        lineHeight:20,
    },
})
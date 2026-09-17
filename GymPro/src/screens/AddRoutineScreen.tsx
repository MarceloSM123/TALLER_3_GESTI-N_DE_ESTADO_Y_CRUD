import {Text,StyleSheet,View,TextInput,TouchableOpacity,ScrollView,Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import React, { useState } from 'react';

const COLORS = {
    primary: '#6C5CE7',
    background: '#F4F5FB',
    card: '#FFFFFF',
    textDark: '#1F2233',
    textMuted: '#8A8FA3',
    border: '#E6E9F5',
};

const MUSCLE_GROUPS = ['Pecho','Espalda','Pierna','Hombro','Bíceps','Tríceps','Abdomen'];

const MUSCLE_COLORS: Record<string, string> = {
    Pecho: '#FF6B6B',
    Espalda: '#4A7DFF',
    Pierna: '#00C9A7',
    Hombro: '#FFA94D',
    'Bíceps': '#A55EEA',
    'Tríceps': '#FF8A5C',
    Abdomen: '#F2994A',
};

export default function AddRoutineScreen({navigation, route}: any) {
    const {routines, addRoutine, updateRoutine} = useRoutines();
    const routineId = route?.params?.id;
    const isEditing = Boolean(routineId);
    const existing = routines.find((r)=>r.id===routineId);

    const [name, setName] = useState(existing?.name ?? '');
    const [muscleGroup, setMuscleGroup] = useState(existing?.muscleGroup ?? MUSCLE_GROUPS[0]);
    const [duration, setDuration] = useState(existing?.duration ?? 30);

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert('Falta el nombre', 'Escribe el nombre de tu rutina.');
            return;
        }
        const data = { name: name.trim(), muscleGroup, duration };
        if (isEditing && routineId) {
            updateRoutine(routineId, data);
        } else {
            addRoutine(data);
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView style={Ventana.container}>
            <View style={Ventana.header}>
                <TouchableOpacity style={Ventana.backBtn} onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textDark}/>
                </TouchableOpacity>
                <Text style={Ventana.title}>{isEditing ? 'Editar Rutina' : 'Nueva Rutina'}</Text>
                <View style={Ventana.backBtn}/>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={Ventana.content}>
                <View style={Ventana.field}>
                    <Text style={Ventana.label}>Nombre de la rutina</Text>
                    <TextInput
                        style={Ventana.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Ej: Pecho y Tríceps"
                        placeholderTextColor={COLORS.textMuted}
                        maxLength={40}
                    />
                </View>

                <View style={Ventana.field}>
                    <Text style={Ventana.label}>Grupo muscular</Text>
                    <View style={Ventana.chips}>
                        {MUSCLE_GROUPS.map((group)=>{
                            const color = MUSCLE_COLORS[group] ?? COLORS.primary;
                            const selected = muscleGroup === group;
                            return(
                                <TouchableOpacity
                                    key={group}
                                    style={[Ventana.chip, selected && {backgroundColor:color, borderColor:color}]}
                                    onPress={()=>setMuscleGroup(group)}
                                >
                                    <Text style={[Ventana.chipText, selected && Ventana.chipTextSelected]}>
                                        {group}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={Ventana.field}>
                    <Text style={Ventana.label}>Duración</Text>
                    <View style={Ventana.stepper}>
                        <TouchableOpacity style={Ventana.stepperBtn} onPress={()=>setDuration(d=>Math.max(5, d-5))}>
                            <Ionicons name="remove" size={22} color={COLORS.primary}/>
                        </TouchableOpacity>
                        <View style={Ventana.stepperValue}>
                            <Text style={Ventana.stepperNumber}>{duration}</Text>
                            <Text style={Ventana.stepperUnit}>minutos</Text>
                        </View>
                        <TouchableOpacity style={Ventana.stepperBtn} onPress={()=>setDuration(d=>Math.min(240, d+5))}>
                            <Ionicons name="add" size={22} color={COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={Ventana.footer}>
                <TouchableOpacity style={Ventana.saveBtn} activeOpacity={0.85} onPress={handleSave}>
                    <Ionicons name="checkmark" size={22} color="#FFFFFF"/>
                    <Text style={Ventana.saveText}>{isEditing ? 'Guardar cambios' : 'Crear rutina'}</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal:20,
        paddingTop:12,
        paddingBottom:24,
    },

    field:{
        marginBottom:24,
    },

    label:{
        fontSize:14,
        fontWeight:'700',
        color:COLORS.textDark,
        marginBottom:10,
    },

    input:{
        backgroundColor:COLORS.card,
        borderRadius:14,
        paddingHorizontal:16,
        paddingVertical:14,
        fontSize:16,
        color:COLORS.textDark,
        borderWidth:1,
        borderColor:COLORS.border,
    },

    chips:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:10,
    },

    chip:{
        paddingHorizontal:16,
        paddingVertical:10,
        borderRadius:22,
        backgroundColor:COLORS.card,
        borderWidth:1,
        borderColor:COLORS.border,
    },

    chipText:{
        fontSize:14,
        fontWeight:'600',
        color:COLORS.textMuted,
    },

    chipTextSelected:{
        color:'#FFFFFF',
        fontWeight:'700',
    },

    stepper:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:COLORS.card,
        borderRadius:14,
        borderWidth:1,
        borderColor:COLORS.border,
        padding:10,
    },

    stepperBtn:{
        width:44,
        height:44,
        borderRadius:22,
        backgroundColor:'#EDEBFB',
        alignItems:'center',
        justifyContent:'center',
    },

    stepperValue:{
        flex:1,
        alignItems:'center',
    },

    stepperNumber:{
        fontSize:28,
        fontWeight:'800',
        color:COLORS.textDark,
    },

    stepperUnit:{
        fontSize:12,
        color:COLORS.textMuted,
    },

    footer:{
        paddingHorizontal:20,
        paddingBottom:12,
        paddingTop:8,
    },

    saveBtn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:8,
        backgroundColor:COLORS.primary,
        borderRadius:16,
        paddingVertical:16,
        shadowColor:COLORS.primary,
        shadowOffset:{width:0,height:6},
        shadowOpacity:0.3,
        shadowRadius:10,
        elevation:5,
    },

    saveText:{
        fontSize:16,
        fontWeight:'700',
        color:'#FFFFFF',
    },
})
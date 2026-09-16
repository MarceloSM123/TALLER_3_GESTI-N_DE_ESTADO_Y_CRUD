import react, { useState, useContext, createContext, ReactNode } from 'react'

export type Routine = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
}

type RoutineContextType = {
    routines: Routine[];
    addRoutine: (routine: Omit<Routine, 'id' | 'createdAt'>) => void;
    updateRoutine: (id: string, routine: Omit<Routine, 'id' | 'createdAt'>) => void;
    deleteRoutine: (id: string) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {

    //variable rutina 

    const [routines, setRoutines] = useState<Routine[]>([
        {
            id: "1",
            name: "Pecho y Tríceps",
            muscleGroup: "Pecho",
            duration: 60,
            createdAt: new Date().toLocaleDateString()
        },
        {
            id: "2",
            name: "Espalda y Bíceps",
            muscleGroup: "Espalda",
            duration: 75,
            createdAt: new Date().toLocaleDateString()
        }
    ]);

    const addRoutine = (routine: Omit<Routine, 'id' | 'createdAt'>) => {
        const newRoutine = {
            ...routine,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString(),
        }
        setRoutines([...routines, newRoutine])
    }

    const updateRoutine = (id: string, updateRoutine: Omit<Routine, 'id' | 'createdAt'>) => {
        setRoutines(routines.map(r => r.id === id ? { ...r, ...updateRoutine } : r))
    }

    const deleteRoutine = (id: string) => {
        setRoutines(routines.filter(p => p.id != id))
    }

    return (
        <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine }}>
            {children}
        </RoutineContext.Provider>
    )

}

export function useRoutines() {
    const context = useContext(RoutineContext)
    if (!context) throw new Error('useRoutines debe ser usado dentro de una RoutineProvider')
    return context
}


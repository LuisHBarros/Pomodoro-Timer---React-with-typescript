import React, { useEffect, useReducer } from "react";
import { createContext, useState } from "react";
import { Cycle, cyclesReducer } from "../reducer/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCycleAsFinishedAction } from "../reducer/cycles/actionsTypes";
import { differenceInSeconds } from "date-fns";

interface CreateNewCycleData{
    task: string;
    minutesAmount: number;

}


interface CyclesContextData {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    interruptCurrentCycle: () => void;
    createNewCycle: (data: CreateNewCycleData) => void;


}


export const CycleContext = createContext({} as CyclesContextData)

interface CyclesContextProviderProps {
    children: React.ReactNode;
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const [cyclesState, dispath] = useReducer(cyclesReducer, { cycles: [], activeCycleId: null }, (inicialState) => {
        const localStorageState = localStorage.getItem("@ignite-timer:cycles-state:V1.0")
        if (localStorageState) {
            return JSON.parse(localStorageState)
        }
        return inicialState
    
    });
    
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (!activeCycle) return 0;
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        })
    useEffect(() => {
        console.log("Cycles State:", cyclesState)
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem("@ignite-timer:cycles-state:V1.0", stateJSON)
     }, [cyclesState])
    
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }
    

    function markCycleAsFinished() {
        dispath(markCycleAsFinishedAction())
        
      }

    function createNewCycle(data: CreateNewCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
        startDate: new Date(),
      
        }
        dispath(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0)
  }

    function interruptCurrentCycle() {

    dispath(interruptCurrentCycleAction())
  }

    return (
        <CycleContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CycleContext.Provider>
    )
}
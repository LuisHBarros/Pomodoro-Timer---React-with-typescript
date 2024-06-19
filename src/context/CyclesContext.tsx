import React from "react";
import { createContext, useState } from "react";

interface CreateNewCycleData{
    task: string;
    minutesAmount: number;

}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}
interface CyclesContextData {
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

export function CyclesContextProvider({children} : CyclesContextProviderProps) {
        const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
        function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
      }

    function markCycleAsFinished() {
        setCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
        )
      }
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    function createNewCycle(data: CreateNewCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // reset()
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

    return (
        <CycleContext.Provider value={{
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
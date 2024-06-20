import { Cycle } from "./reducer";

export enum CycleActionTypes {
    CREATE_NEW_CYCLE = "CREATE_NEW_CYCLE",
    MARK_CYCLE_AS_FINISHED = "MARK_CYCLE_AS_FINISHED",
    INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
}

export interface CreateNewCycleAction {
    type: CycleActionTypes;
    payload?: {
        newCycle: Cycle;
    };
}

export function addNewCycleAction(newCycle: Cycle) {
    console.log("addNewCycleAction", newCycle);
    return {
        type: CycleActionTypes.CREATE_NEW_CYCLE,
        payload: {
            newCycle,
        },
    };
}

export function markCycleAsFinishedAction(/*activeCycleId: string*/) {
    return {
        type: CycleActionTypes.MARK_CYCLE_AS_FINISHED,
        // payload: {
        //     activeCycleId,
        // },
    };
}

export function interruptCurrentCycleAction(/*activeCycleId: string*/) {
    return {
        type: CycleActionTypes.INTERRUPT_CURRENT_CYCLE,
        // payload: {
        //     activeCycleId,
        // },
    };
}

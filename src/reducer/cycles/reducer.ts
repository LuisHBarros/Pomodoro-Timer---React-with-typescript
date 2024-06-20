import { produce } from "immer";
import { CreateNewCycleAction, CycleActionTypes } from "./actionsTypes";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(
    state: CyclesState,
    action: CreateNewCycleAction
) {
    switch (action.type) {
        case CycleActionTypes.CREATE_NEW_CYCLE: {
            if (action.payload === undefined) {
                return state;
            } else {
                return produce(state, (draft) => {
                    draft.cycles.push(action.payload?.newCycle as Cycle);
                    draft.activeCycleId = action.payload?.newCycle.id as string;
                });
            }
            // return {
            //     ...state,
            //     cycles: [...state.cycles, action.payload.newCycle],
            //     activeCycleId: action.payload.newCycle.id,
        }
        case CycleActionTypes.MARK_CYCLE_AS_FINISHED: {
            // return {
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === action.payload.activeCycleId) {
            //             return { ...cycle, finishedDate: new Date() };
            //         } else {
            //             return cycle;
            //         }
            //     }),
            //     activeCycleId: null,
            // };
            const currentCycle = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId;
            });
            if (currentCycle < 0) {
                return state;
            }
            return produce(state, (draft) => {
                draft.cycles[currentCycle].finishedDate = new Date();
                draft.activeCycleId = null;
            });
        }
        case CycleActionTypes.INTERRUPT_CURRENT_CYCLE: {
            // return {
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === action.payload.activeCycleId) {
            //             return { ...cycle, interruptedDate: new Date() };
            //         } else {
            //             return cycle;
            //         }
            //     }),
            //     activeCycleId: null,
            // };
            const currentCycle = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId;
            });
            if (currentCycle < 0) {
                return state;
            }
            return produce(state, (draft) => {
                draft.cycles[currentCycle].interruptedDate = new Date();
                draft.activeCycleId = null;
            });
        }
        default:
            return state;
    }
}

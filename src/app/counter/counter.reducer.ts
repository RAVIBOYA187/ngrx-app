import { createReducer, on } from "@ngrx/store"
import { decrement, increment, reset } from "./counter.actions"

export interface counterState {
    count: number
}

export const initialState: counterState = {
    count: 0
}

export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        console.log("increment => ", increment());
        console.log("type => ", increment().type);
        return {
            ...state,
            count: state.count + 1
        }
    }),
    on(
        reset,
        (state) => {
            return {
                ...state,
                count: 0
            }
        }
    ),
    on(
        decrement,
        (state) => {
            return {
                ...state,
                count: state.count - 1
            }
        }
    )

)
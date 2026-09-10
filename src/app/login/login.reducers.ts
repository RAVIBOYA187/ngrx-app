import { createReducer, on } from "@ngrx/store"
import { formResetAction, formUpdateAction } from "./login.actions"


export interface formState {
    name: string,
    email: string
}

export const initialstate: formState = {
    name: "",
    email: ""
}

export const formReducer = createReducer(
    initialstate,
    on(
        formUpdateAction,
        (state, { field, value }) => {
            console.log({ ...state, [field]: value });
            return {
                ...state,
                [field]: value
            }
        }
    ),

    on(
        formResetAction,
        () => {
            return initialstate
        }
    )
)
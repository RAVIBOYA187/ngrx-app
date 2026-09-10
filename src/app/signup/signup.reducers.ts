import { createReducer, on } from "@ngrx/store"
import { signupSubmitAction } from "./signp.actions"

export interface signupDataState {
    name: string,
    email: string,
    mobile: string,
    password: string
}

const initialSignupData: signupDataState = {
    name: "",
    email: "",
    mobile: '',
    password: ""
}

export const signupReducer = createReducer(
    initialSignupData,

    on(signupSubmitAction,
        (state, obj) => {
            console.log("signupReducer : ", { ...state, ...obj });
            return { ...state, ...obj }
        }
    )
)
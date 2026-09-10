import { createFeature } from "@ngrx/store";
import { signupReducer } from "./signup.reducers";


export const signupSelector = createFeature({
    name: "signup",
    reducer: signupReducer
})
import { createFeature } from "@ngrx/store";
import { formReducer } from "./login.reducers";


export const formSelector = createFeature(
    {
        name: "login",
        reducer: formReducer
    }
)
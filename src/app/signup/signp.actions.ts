import { createAction, props } from "@ngrx/store";


export const signupSubmitAction = createAction(
    '[signup] submit signup form',
    props<{
        name: string, email: string, mobile: string, password: string
    }>()
)
import { createAction, emptyProps, props } from "@ngrx/store";


export const formUpdateAction = createAction(
    "[login] update filed",
    props<{ field: "name" | "email", value: string }>()
)

export const formSubmitAction = createAction(
    "[login] submit form"
)

export const formResetAction = createAction(
    '[login] reset form',
    emptyProps
)
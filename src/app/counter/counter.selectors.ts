import { createFeature, createFeatureSelector, createSelector, State } from "@ngrx/store";
import { counterReducer, counterState } from "./counter.reducer";



// export const selectCounterState = createFeatureSelector<counterState>("count");

// export const selectCount = createSelector(
//     selectCounterState,
//     state => state.count
// )

// export const selectCountState = createSelector(
//     selectCounterState,
//     state => state
// )


export const countSelectFeature = createFeature({
    name: "count",
    reducer: counterReducer
}

)
import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { productReducer } from './products.reducer';


export const productSelector = createFeature(
    {
        name: "products",
        reducer: productReducer
    }

)
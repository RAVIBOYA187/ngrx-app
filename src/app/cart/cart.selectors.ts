import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { cartReducer } from './cart.reducer';


export const cartSelector = createFeature(
    {
        name: "cart",
        reducer: cartReducer
    }

)

export const selectCartCount = createSelector(
    cartSelector.selectCartList,
    (cartList) => cartList.reduce((acc, item) => acc + Number(item.quantity), 0)
)

export const selectCartTotal = createSelector(
    cartSelector.selectCartList,
    (cartList) => cartList.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
)
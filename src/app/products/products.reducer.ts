import { createReducer, on, provideState } from '@ngrx/store';
import { ProductsActions } from './products.actions';
import { producerAccessed } from '@angular/core/primitives/signals';


export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
}

export interface ProductsState {
    productsList: Product[],
    loading: boolean,
    error: string | null
};

export const initialState: ProductsState = {
    productsList: [],
    loading: true,
    error: null
}

export const productReducer = createReducer(
    initialState,

    on(
        ProductsActions.productsLoading, (state) => {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
    ),
    on(ProductsActions.productsLoadingSuccess, (state, { products }) => {
        // console.log(products);
        return {
            ...state,
            productsList: products,
            loading: false,
            error: null
        }
    }),

    on(ProductsActions.productsLoadingFailure, (state, { errorMsg }) => {
        return {
            ...state,
            loading: false,
            error: errorMsg
        }
    })

);

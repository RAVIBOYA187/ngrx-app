import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';


export interface cartItem {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    quantity: number
}

export interface cartState {
    cartList: cartItem[],
    loading: boolean,
    error: string | null
}

export const initialState: cartState = {
    cartList: [],
    loading: false,
    error: null
};

export const cartReducer = createReducer(
    initialState,

    on(CartActions.addToCart, (state, { item }) => {

        // console.log("reducer...... addtocart");
        let existingProduct = state.cartList.find(product => product.id === item.id)
        if (existingProduct) {
            return {
                ...state,
                cartList: state.cartList.map(product =>
                    product.id === item.id ?
                        { ...product, quantity: product.quantity + 1 }
                        : product

                ),
                loading: false,
                error: null
            }
        }
        return {
            ...state,
            cartList: [...state.cartList, { ...item, quantity: 1 }],
            loading: false,
            error: null
        }
    }),

    on(CartActions.removeFromCart, (state, { id }) => {
        return {
            ...state,
            cartList: state.cartList.filter((item) => {
                return item.id !== id
            })
        }

    }),

    on(CartActions.increaseQuantity, (state, { id }) => {
        return {
            ...state,
            cartList: state.cartList.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        }
    }),

    on(
        CartActions.decreaseQuantity,
        (state, { id }) => {
            return {
                ...state,
                cartList: state.cartList
                    .map((item) =>
                        item.id === id ?
                            { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter(item => item.quantity > 0)
            }
        }
    ),



    on(CartActions.clearCart, (state) => {
        return initialState
    })


);

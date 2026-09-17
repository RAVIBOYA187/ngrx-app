import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../products/products.reducer';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Carts': emptyProps(),
    'Add to Cart': props<{ item: Product }>(),
    'Remove From Cart': props<{ id: number }>(),
    'increase Quantity': props<{ id: number }>(),
    'decrease Quantity': props<{ id: number }>(),
    'clear Cart': emptyProps(),

  },
});

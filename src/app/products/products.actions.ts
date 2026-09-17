import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from './products.reducer';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Products loading': emptyProps(),
    'Products loading Success': props<{ products: Product[] }>(),
    'Products loading  Failure': props<{ errorMsg: string }>(),
  },
});

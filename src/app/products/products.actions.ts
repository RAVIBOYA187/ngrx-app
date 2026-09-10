import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Products Productss': emptyProps(),
    'Products Productss Success': props<{ data: unknown }>(),
    'Products Productss Failure': props<{ error: unknown }>(),
  },
});

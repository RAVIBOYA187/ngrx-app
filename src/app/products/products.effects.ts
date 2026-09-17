import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from './products.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product-service';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductService)

  loadProducts$ = createEffect(
    () =>
      this.actions$.
        pipe(
          ofType(ProductsActions.productsLoading),
          // tap(() => console.log("tappp")),
          switchMap(() =>
            this.productsService.getProducts().
              pipe(
                map((products) => {
                  // console.log("mappppp")
                  return (
                    ProductsActions.productsLoadingSuccess({ products }))
                }
                ),
                catchError((error) => {
                  // console.log("errr");
                  return (
                    of(
                      ProductsActions.productsLoadingFailure({ errorMsg: error.message || "failed to load products " })
                    )
                  )

                }

                )
              )
          )
        )

  )




}

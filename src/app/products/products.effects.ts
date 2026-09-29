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
                // map((products) => {
                //   // console.log("mappppp")
                //   return (
                //     ProductsActions.productsLoadingSuccess({ products: products }))
                // }
                // ),

                // removing rating key from product object
                map((products) => {
                  console.log(products);
                  // console.log(products.data);
                  let filteredProducts = products.
                    map(
                      ({ id, title, price, description, category, images }) =>
                      ({
                        id,
                        title,
                        price,
                        description,
                        category: category.name,
                        image: images[0]
                      })
                    );

                  filteredProducts = filteredProducts.filter((p) => p.id <= 51)

                  console.log(filteredProducts);

                  return ProductsActions.productsLoadingSuccess({ products: filteredProducts })
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

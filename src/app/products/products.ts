// import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsActions } from "./products.actions";
import { productSelector } from "./products.selectors";
import { AsyncPipe, CurrencyPipe, JsonPipe, SlicePipe } from "@angular/common";
import { CartActions } from "../cart/cart.actions";
import { Product } from "./products.reducer";

@Component({
  imports: [AsyncPipe, CurrencyPipe, SlicePipe],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products implements OnInit {

  private store = inject(Store)

  products$ = this.store.select(productSelector.selectProductsList)
  error$ = this.store.select(productSelector.selectError)
  loading$ = this.store.select(productSelector.selectLoading)

  ngOnInit(): void {
    // console.log("ngoninittttt");

    this.store.dispatch(ProductsActions.productsLoading())
  }


  addToCart(product: Product) {

    // console.log("product.ts..... add to cart()");

    // const addToCartConfirmation = confirm("Do You Want To Add " + product.title.slice(0, 20).toUpperCase() + " to Cart")
    // if (addToCartConfirmation) {
    //   this.store.dispatch(CartActions.addToCart({ item: product }))
    // }

    this.store.dispatch(CartActions.addToCart({ item: product }))
    // alert(product.title.slice(0, 20).toUpperCase() + " added to Cart..")



  }








  // constructor(private cf: ChangeDetectorRef) {
  //   this.cf.detach()
  // }

  // num = {
  //   count: 0
  // }
  // play() {

  //   this.cf.detectChanges()

  //   setInterval(() => {


  //   this.num = { ...this.num, count: this.num.count + 1 }

  //   console.log("detached....." + this.num.count);

  //   this.cf.markForCheck
  //   // this.cf.reattach()
  //   // console.log("detached.....");

  //   return "play volleyball"
  // }, 1000);
  // return " playyy"
  // }
}

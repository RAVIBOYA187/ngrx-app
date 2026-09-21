import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartSelector, selectCartCount, selectCartTotal } from './cart.selectors';
import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { CartActions } from './cart.actions';
import { cartItem, cartState } from './cart.reducer';
import { RouterLink } from '@angular/router';

@Component({
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {


  private store = inject(Store<cartState>)

  cartList$ = this.store.select(cartSelector.selectCartList);
  cartCount$ = this.store.select(selectCartCount);
  cartTotal$ = this.store.select(selectCartTotal);



  increase(id: number) {
    console.log("increeee .... " + this.cartTotal$);

    this.store.dispatch(CartActions.increaseQuantity({ id: id }))
  }

  decrease(id: number) {

    this.store.dispatch(CartActions.decreaseQuantity({ id: id }))
  }

  remove(item: cartItem) {

    let removeItemConfirmation = confirm("Do You Want To Remove " + item.title.slice(0, 20).toUpperCase())
    if (removeItemConfirmation) {
      this.store.dispatch(CartActions.removeFromCart({ id: item.id }))
    }

  }

  clearCart() {
    let clearCartConfirmation = confirm("Are You Sure Want To Clear The Cart...")
    if (clearCartConfirmation) {
      this.store.dispatch(CartActions.clearCart())

    }

  }
}

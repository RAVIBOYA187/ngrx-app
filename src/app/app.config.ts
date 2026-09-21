import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { counterReducer } from './counter/counter.reducer';
import { formReducer } from './login/login.reducers';
import { formSelector } from './login/login.selectors';
import { signupSelector } from './signup/signup.selectors';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductsEffects } from './products/products.effects';
import { productSelector } from './products/products.selectors';
import { cartSelector } from './cart/cart.selectors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ count: counterReducer }),
    provideState(formSelector),
    provideState(signupSelector),
    provideState(productSelector),
    provideState(cartSelector),
    provideEffects([ProductsEffects]),
    provideStoreDevtools({
      maxAge: 45
    })
  ],
};

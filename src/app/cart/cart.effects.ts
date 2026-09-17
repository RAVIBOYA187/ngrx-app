import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
}

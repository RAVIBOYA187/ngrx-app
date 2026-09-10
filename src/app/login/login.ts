import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { formState } from './login.reducers';
import { formSelector } from './login.selectors';
import { formResetAction, formSubmitAction, formUpdateAction } from './login.actions';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe, JsonPipe],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {


  formDetails$ !: Observable<{ name: string, email: string }>

  private store = inject(Store<formState>)

  constructor() {
    this.formDetails$ = this.store.select(formSelector.selectLoginState)
  }

  handleInputChange(field: 'name' | 'email', value: string) {
    this.store.dispatch(formUpdateAction({ field, value }))
  }

  handleSubmit() {

    this.store.dispatch(formSubmitAction())
  }

  handleReset() {
    this.store.dispatch(formResetAction())
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { signupDataState } from './signup.reducers';
import { signupSubmitAction } from './signp.actions';
import { signupSelector } from './signup.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe, JsonPipe],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {

  store = inject(Store<signupDataState>)
  data$: Observable<signupDataState>

  signupData = new FormGroup({

    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })

  constructor() {
    this.data$ = this.store.select(signupSelector.selectSignupState)

  }

  get name() {
    return this.signupData.get("name")
  }

  get email() {
    return this.signupData.get("email")
  }

  get mobile() {
    return this.signupData.get("mobile")
  }

  get password() {
    return this.signupData.get("password")
  }

  handleSubmit() {
    if (this.signupData.invalid) {
      this.signupData.markAllAsTouched()

      return

    }

    let temp = this.signupData.getRawValue()

    this.store.dispatch(signupSubmitAction({
      name: this.signupData.get("name")?.value!,
      email: temp.email!,
      mobile: temp.mobile!,
      password: temp.password!
    }))

    alert(this.signupData.get("name")?.value + " your details submitted sucessfully....")

  }

  handleReset() {
    this.signupData.reset()

  }



}

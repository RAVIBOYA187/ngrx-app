

import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';


@Component({
  imports: [
    ReactiveFormsModule,

  ],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {


  // NgRx Store


  // Registration Form
  signupData = new FormGroup({

    name: new FormControl('', [
      Validators.required
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])

  });


  // Getters for template validation
  get name() {
    return this.signupData.get('name');
  }

  get email() {
    return this.signupData.get('email');
  }

  get mobile() {
    return this.signupData.get('mobile');
  }

  get password() {
    return this.signupData.get('password');
  }


  // Submit form
  handleSubmit() {

    if (this.signupData.invalid) {

      this.signupData.markAllAsTouched();

      return;
    }

    const formData = this.signupData.getRawValue();



  }


  // Reset form
  handleReset() {

    this.signupData.reset();

  }

}
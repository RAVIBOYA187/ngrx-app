import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '../services/user-service';
import { map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { time } from 'console';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  imports: [ReactiveFormsModule],
  templateUrl: './login2.html',
  styleUrl: './login2.css'
})
export class Login2 implements OnInit, OnDestroy {

  private userService = inject(UserService)
  private router = inject(Router)


  loginForm = new FormGroup({

    username: new FormControl('ravi@gmail.com', [
      Validators.required,
    ]),

    password: new FormControl('ravi', [
      Validators.required,
      Validators.minLength(4)
    ])

  });

  data = {

  }

  ngOnInit(): void {
    console.log("login2");

    this.userService.getUsers().pipe(

      tap((u) => {
        // console.log(u.users);
        return u
      }),
      map((d) => {
        // console.log(d);
        // console.log(d.users[10].hair.color)
        // console.log(d.limit);
        return d
      })
    ).subscribe(
      // (d) => console.log(d)
    )


    // console.log(this.userService.getUsers());

    // let ld = this.loginForm.getRawValue;
    console.log("..... ", this.loginForm.get("email"));

    // this.userService.loginUser({ username: this.loginForm.get("email")?.value!, password: this.loginForm.get("password").value! }).subscribe((d) => {

    //   // console.log(this.data);
    //   this.data = d;
    //   console.log(d.refreshToken)
    //   // console.log("data ", this.data);
    // }
    // )
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleLogin() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.getRawValue();

    console.log('Login Data:', loginData);

    this.userService.loginUser({ username: loginData.username!, password: loginData.password })
      .subscribe((user) => {

        console.log(user);
        console.log(user.accessToken);
      })

    // "emilys"
    // "emilyspass"
    // alert('Login successful');


    // let isLoggedIn = localStorage.getItem("isLoggedIn")
    if (loginData.username === "ravi@gmail.com" && loginData.password === "ravi") {

      let isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
      console.log("logggeeddd...");

      this.router.navigate(['/products'])
    }

  }

  handleReset() {
    this.loginForm.reset();
  }


  ngOnDestroy(): void {
    // localStorage.removeItem("isLoggedIn")
  }

}
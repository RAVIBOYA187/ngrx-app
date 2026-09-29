import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  private platformId = inject(PLATFORM_ID);

  private router = inject(Router)

  isLoggedIn = signal(isPlatformBrowser(this.platformId) ? localStorage.getItem("isLoggedIn") === 'true' : false)

  logout() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    console.log("before logout ", this.isLoggedIn());

    let logoutConfirm = confirm("are You Sure Want to Logout")
    if (logoutConfirm) {
      localStorage.removeItem('isLoggedIn')
      this.isLoggedIn.set(false);

      console.log("after logout ", this.isLoggedIn());

      this.router.navigate(['/login2'])
    }


    return
  }



}

import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "false")

  let platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  if (isLoggedIn) {

    console.log("auth....trueee");
    return true
  }

  console.log("please login to access all components");

  return router.createUrlTree(['/login2']);
};

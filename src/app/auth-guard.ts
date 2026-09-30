import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 1. If we are on the server, localStorage doesn't exist. 
  // Return true so the server doesn't crash or block rendering prematurely.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // 2. Safely access localStorage now that we are guaranteed to be in the browser
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');

  if (isLoggedIn) {
    return typeOfCheckPass(); // or just return true;
  }

  return router.createUrlTree(['/login2']);
};

function typeOfCheckPass() {
  return true;
}
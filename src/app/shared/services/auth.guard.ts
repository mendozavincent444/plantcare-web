import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl("/login");
}

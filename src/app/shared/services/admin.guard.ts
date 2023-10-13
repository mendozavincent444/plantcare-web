import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

const ADMIN_ROLE = "ROLE_ADMIN"; 

export const AdminGuard = () => {

  const userService = inject(UserService);
  const router = inject(Router);

  const currentUser = userService.getUser().value;

  if (currentUser.role === ADMIN_ROLE) {
    return true;
  }
  
  return router.parseUrl("/home")
}

import { inject } from "@angular/core"
import { UserService } from "./user.service"
import { Router } from "@angular/router";

const SUPERADMIN_ROLE = "ROLE_SUPERADMIN";

export const SuperadminGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const currentUser = userService.getUser().value;

  if (currentUser.role === SUPERADMIN_ROLE) {
    return true;
  }

  return router.parseUrl("/home");
}
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

/**
 * Guard protect pages against unauthorized users
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser) router.navigate(['/register-passenger', {requestedUrl: state.url}]);

  return true;
};

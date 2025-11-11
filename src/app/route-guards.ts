import {CanMatchFn} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from './services/login.service';

export const loginGuard: CanMatchFn = (route, segments) => {
  const loginService = inject(LoginService);
  return loginService.isUserLoggedIn();
}

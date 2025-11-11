import {Component, inject} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {getCookies} from 'typescript-cookie';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  loginService = inject(LoginService);
  userId?: number;
  router = inject(Router);

  ngOnInit() {
    this.userId = this.loginService.user.userId;

  }
  get userInitials(): string {
    // Build from your logged-in user model
    const f = this.loginService.user?.firstName?.[0] ?? 'U';
    const l = this.loginService.user?.lastName?.[0] ?? '';
    return (f + l).toUpperCase();
  }
  logout():void{
    console.log('logging out')
    this.loginService.logout().subscribe({
      next: () => {
        this.loginService.clearSession();
        this.router.navigate(['/login'], {
          replaceUrl: true,                 // prevent back button returning to protected page
          queryParams: { reason: 'logout' } // optional: show a toast on login page
        });
      },
      error: () => {
        // even if the POST fails, clear client state and send them to login
        this.loginService.clearSession();
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    });
  }

}

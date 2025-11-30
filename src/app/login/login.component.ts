import {Component, inject, Injectable} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {RouterLink, Router} from '@angular/router';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({providedIn: 'root'})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  loading = false;
  showPw = false;
  authError = '';
  user: User = new User();

  login(formData: NgForm) {
    if (formData.invalid || this.loading) return;
    this.loading = true;

    const username = formData.form.value.username;
    const password = formData.form.value.password;
    const body = new URLSearchParams();
    if (formData.form.value['remember-me']) body.set('remember-me', 'on'); // any non-empty value works


    this.loginService.login(username, password, body).subscribe(
      next => {
        this.loading = false;
        this.authError = '';
        // wherever you send them after auth:
        this.router.navigate(['/challenges'], {replaceUrl: true});
      },
      error => {
        console.log(error);
        this.loading = false;
        this.authError = 'Invalid username or password.';
      }
    );


  }

}

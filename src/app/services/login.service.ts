import {inject, Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs'
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  router = inject(Router);
  http: HttpClient;
  cookieService: CookieService;
  xsrfToken: string;
  sessionId: string;
  user = new User();

  constructor() {
    this.http = inject(HttpClient);
    this.cookieService = inject(CookieService);
    this.xsrfToken = "";
    this.sessionId = "";
  }

  login(username: string, password: string, body: URLSearchParams): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ":" + password)
    });

    return this.http.get('/api/v1/users/user', {
      headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(
      // The response sets JSESSIONID. Now warm the session with a 2nd call if you want:
      // switchMap(() => this.http.get('/api/v1/users/user', { withCredentials: true })),
      tap(next => {
          this.user = <User>next.body
          window.sessionStorage.setItem("user", JSON.stringify(this.user));
          this.setUser(this.user);
        }
      )
    );

  }


  isUserLoggedIn() {
    return !!window.sessionStorage.getItem("user");
  }

  logout() {
    return this.http.post(
      '/logout',         // relative URL so XSRF header is added
      {},
      {
        withCredentials: true,
        observe: 'response',
        // tell HttpClient we don't expect JSON so it won't try to parse HTML or empty body
        responseType: 'text' as 'json'
      }
    );

  }

  clearSession() {
    sessionStorage.removeItem('user');
    this.cookieService.deleteAll();
    // flip any auth signals/subjects you use
  }

  setUser(user: User) {
    this.user = user;
  }


}

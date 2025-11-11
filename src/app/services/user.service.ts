import {Injectable} from '@angular/core';
import {UserCreatePayload} from '../models/user-payload';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
// import {WebConfig} from '../models/web-config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  constructor() {
  }

  createUser(user:UserCreatePayload): Observable<User> {
      return this.http.post<User>('/api/v1/users/create', user);
  }
  // getUserById(userId: number):Observable<User> {
  //   return this.httpClient.get<User>(this.webConfig.BACKEND_URL+'/api/v1/users/'+userId, {}).observe('response');
  // }
}

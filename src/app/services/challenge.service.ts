import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Challenge} from '../models/challenge';
import {Exercise} from '../models/exercise';
@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  httpClient: HttpClient;
  constructor() {
    this.httpClient = inject(HttpClient);
  }
  getCurrentChallenge() {
    const userId = window.sessionStorage.getItem('user');
    return this.httpClient.get<Challenge>('/api/v1/challenges/activechallenges', {
      withCredentials: true,
      observe: 'body'
    })
  }
  getChallengeUsers(chid: number) {
    return this.httpClient.get<User[]>('/api/v1/challenges/'+chid+"/users", {
      withCredentials: true,
      observe: 'body'
    })
  }
  getChallengeExercises(chid: number) {
    return this.httpClient.get<Page<Exercise>>('/api/v1/challenges/'+chid+"/exercises", {
      withCredentials: true,
      observe: 'body'
    })
  }

}

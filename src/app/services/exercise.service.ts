import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Exercise, ExerciseCreatePayload} from '../models/exercise';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  httpClient: HttpClient;

  constructor() {
    this.httpClient = inject(HttpClient);
  }

  getExerciseByChallenge(challengeId: number) {
    return this.httpClient.get<HttpResponse<any>>('/api/v1/exercises/challenge/' + challengeId, {
      withCredentials: true,
      observe: 'response'
    })
  }

  getExerciseById(id: number) {
  }

  getExerciseByUserId(userId: number) {
  }

  saveExercise(exercise: ExerciseCreatePayload): Observable<Exercise> {

    return this.httpClient.post<Exercise>('/api/v1/exercises/distance/rowing/save', exercise,
      {
        withCredentials: true,
        observe: "body",

      });
  }


  // getExercisesByUserId(userId: number): Exercise[] {
  //   return new Exercise[1];
  // }
}

import {Component, inject, signal} from '@angular/core';
import {ChallengeService} from '../services/challenge.service';
import {Challenge} from '../models/challenge';
import {ChalllengeType} from '../models/challlenge-type';
import {ExerciseService} from '../services/exercise.service';
import {tap, concatMap} from 'rxjs/operators';
import {User} from '../models/user';
import {Exercise, ExerciseCreatePayload} from '../models/exercise';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {DateRangeValidatorDirective} from '../directives/date-range.directive';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  imports: [
    FormsModule,
    DateRangeValidatorDirective
  ],
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.css'
})
export class ChallengePageComponent {
  challengeService = inject(ChallengeService)
  challenge!: Challenge;
  exercises: Exercise[] = [];
  users: User[] = [];
  exerciseService = new ExerciseService();
  showForm = signal(false)
  ngOnInit() {
    this.challengeService.getCurrentChallenge().pipe(
      tap(res=> {
        this.challenge = res;
        console.log(res);
      }
      ),
      concatMap(
          payload =>this.challengeService.getChallengeExercises(this.challenge.challengeId).pipe(
            tap((res: Page<Exercise>) => {
              this.exercises = res.content;
              console.log(this.exercises)
            })
          )
        )
    ).subscribe();

  }
  logExercise(form: NgForm) {
    console.log("button clicked");
    console.log(form);
  }
  addExercise(form: NgForm) {
    if (form.invalid) return;

    const payload = form.value; // { participantId, startTime, endTime, distance, notes }
    let exercise: ExerciseCreatePayload = payload;

    exercise.challengeId = this.challenge.challengeId;
    exercise.type = this.challenge.exerciseType;
    console.log("exercise: "+exercise.challengeId);
    const startLocal = form.value.startTime as string;
    const endLocal   = form.value.endTime as string;

// Convert local → JS Date → ISO UTC string with Z
    const startIso = new Date(startLocal).toISOString();
    const endIso   = new Date(endLocal).toISOString();


    // TODO: call your service: this.exerciseService.create(payload).subscribe(...)
  payload.startTime = startIso;
  payload.endTime = endIso;
    this.exerciseService.saveExercise(exercise).subscribe(
      rt => {
        this.exercises.push(rt);
        console.log("returned data bruh: "+ rt.firstName);
      }
    );
    console.log('submit', payload);
    this.showForm.set(false);
    form.resetForm();
  }

  protected readonly ChallengeType = ChalllengeType;
}

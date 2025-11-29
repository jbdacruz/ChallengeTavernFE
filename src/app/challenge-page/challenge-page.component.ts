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

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  imports: [
    FormsModule,
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

    // Values are nested under the "times" group
    const startLocal: string | undefined = form.value?.times?.startTime;
    const endLocal:   string | undefined = form.value?.times?.endTime;

    if (!startLocal || !endLocal) {
      console.error('Missing start/end time from form group');
      return;
    }

    // Convert local (e.g., "2025-11-01T12:43") -> Date -> ISO (UTC "Z")
    const startDate = new Date(startLocal);
    const endDate   = new Date(endLocal);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      console.error('Start/End time invalid');
      return;
    }

    const startIso = startDate.toISOString();
    const endIso   = endDate.toISOString();

    // Build the payload explicitly to avoid stale values
    const exercise: ExerciseCreatePayload = {
      challengeId: this.challenge.challengeId,
      type: this.challenge.exerciseType,
      startTime: startIso,
      endTime: endIso,
      distance: form.value.distance,
      notes: form.value.notes
      // add any other fields your API expects
    };

    this.exerciseService.saveExercise(exercise).subscribe(rt => {
      this.exercises.push(rt);
      this.showForm.set(false);
      form.resetForm();
    });
  }

  protected readonly ChallengeType = ChalllengeType;
}

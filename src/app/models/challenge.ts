import {User} from './user';
import {Workout} from './workout';
import {ChalllengeType} from './challlenge-type';
import {ExerciseType} from './exercise-type';

export interface Challenge {

   challengeId: number;
   users: User[];
   title: string;
   workouts: Workout[];
   startsAt: Date;
   endsAt: Date;
   challengeType: ChalllengeType;
   exerciseType: ExerciseType;
}

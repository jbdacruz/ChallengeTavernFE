import {User} from './user';
import {Workout} from './workout';
import {ExerciseType} from './exercise-type';
import {DistanceUnits} from './distance-units';

export interface Exercise {
  type: ExerciseType;
  id: number;
  firstName: string;
  lastName: string;
  notes: string;
  startTime: Date;
  endTime: Date;
  distance: number;
  workout: Workout;
  distanceUnit: DistanceUnits;
}

export interface ExerciseCreatePayload {
  challengeId: number;          // or number if your API expects a numeric ID
  startTime: string;            // ISO-8601 (UTC) e.g. "2025-10-20T17:35:00.000Z"
  endTime: string;              // ISO-8601 (UTC)
  distanceMeters?: number;      // for distance challenges
  notes?: string;
  type: ExerciseType;
}

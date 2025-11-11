import {MuscleGroup} from './weightlifting-enums/muscle-group';
import {Exercise} from './exercise';

export interface WeightliftingExercise  extends Exercise{
   exerciseName: string;
   muscleGroup: MuscleGroup;
   reps: number;
   weight: number;

}

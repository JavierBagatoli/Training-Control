import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { exercisesActions } from '../actions/exercises.action';
import { listOfExercises } from '../../../store/list-of-exercises';
import { ExerciseOnList } from '../../models/exercises.interface';


@Injectable()
export class ExercesesEffects {
  private actions$ = inject(Actions);

  loadData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exercisesActions.loadListExercises),
      exhaustMap(() => {
        let oldListOfExercises = localStorage.getItem('ListOfExercises');

        if (!oldListOfExercises) {
          oldListOfExercises = JSON.stringify(listOfExercises);
          localStorage.setItem('ListOfExercises', oldListOfExercises);
        }

        return of(exercisesActions.loadListExercisesComplete({data: JSON.parse(oldListOfExercises)}));
      }),
      catchError(() => EMPTY)
    );
  });

  saveListExercises$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(exercisesActions.saveListExercises),
        exhaustMap((data) => {
          localStorage.setItem('ListOfExercises',JSON.stringify(data.data))
          return of(exercisesActions.saveListExercisesComplete())
          }),
        catchError(() => EMPTY)
      );
  });

  saveSetExercises$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(exercisesActions.saveSetExercises),
        exhaustMap((data) => of(
            localStorage.setItem('setOfExercises',JSON.stringify(data.data))
        )
          .pipe(
            map(() => exercisesActions.saveSetExercisesComplete()),
            catchError(() => EMPTY)
          ))
    );
  });
}
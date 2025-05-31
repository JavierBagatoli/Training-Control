import { createReducer, on } from '@ngrx/store';
import { exercisesActions } from '../actions/exercises.action';
import { ExercisesStore } from '../store/exercises.store';

export const initialState: ExercisesStore = {
    listOfExcersices: null,
    listOfExcersicesToDelete: {
        day: -1,
        poss: -1,
    }
};

export const exercisesReducer = createReducer(
  initialState,
  
  on(exercisesActions.restart, () => {
    return initialState
  }),

  on(exercisesActions.setListOfExercises, (state, {list}):ExercisesStore => {
    return {
        ...state,
        listOfExcersices: list
    }
  }),
  on(exercisesActions.deleteListOfExercisesOfDay, (state, {day,poss}):ExercisesStore => {
    console.log('hola')
    return {
        ...state,
        listOfExcersicesToDelete: {
          day: day,
          poss: poss,
        }
    }
  })
)
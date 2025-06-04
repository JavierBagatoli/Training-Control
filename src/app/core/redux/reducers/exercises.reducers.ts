import { createReducer, on } from '@ngrx/store';
import { exercisesActions } from '../actions/exercises.action';
import { ExercisesStore } from '../store/exercises.store';

export const initialState: ExercisesStore = {
    listOfExcersices: null,
    listOfExcersicesToDelete: {
        day: -1,
        poss: -1,
    },
    isOpenNewExercise: false,
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
    return {
        ...state,
        listOfExcersicesToDelete: {
          day: day,
          poss: poss,
        }
    }
  }),
  on(exercisesActions.openDialogNewExercise, (state):ExercisesStore => {
    return {
        ...state,
        isOpenNewExercise: true
    }
  }),

  on(exercisesActions.closeDialogNewExercise, (state):ExercisesStore => {
    return {
        ...state,
        isOpenNewExercise: false
    }
  }),
)
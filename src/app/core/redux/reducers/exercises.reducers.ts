import { createReducer, on } from '@ngrx/store';
import { exercisesActions } from '../actions/exercises.action';
import { ExercisesStore } from '../store/exercises.store';

export const initialState: ExercisesStore = {
    setOfExcersices: null,
    listOfExcersicesToDelete: {
        day: -1,
        poss: -1,
    },
    isOpenNewExercise: false,
    isLoadingListOfExercises: false,
    listOfExercises: [],
};

export const exercisesReducer = createReducer(
  initialState,
  
  on(exercisesActions.restart, () => {
    return initialState
  }),

  on(exercisesActions.setListOfExercises, (state, {list}):ExercisesStore => {
    return {
        ...state,
        setOfExcersices: list
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

  on(exercisesActions.saveListExercises, (state, {data}):ExercisesStore => {
    return {
        ...state,
        isLoadingListOfExercises: true,
        listOfExercises:data
    }
  }),

  on(exercisesActions.saveListExercisesComplete, (state):ExercisesStore => {
    return {
        ...state,
        isLoadingListOfExercises: false
    }
  }),

  on(exercisesActions.loadListExercisesComplete, (state, {data}):ExercisesStore => {
    return {
        ...state,
        isLoadingListOfExercises: true,
        listOfExercises: data
    }
  }),
  on(exercisesActions.loadListExercisesComplete, (state, {data}):ExercisesStore => {
    return {
        ...state,
        isLoadingListOfExercises: false,
        listOfExercises: data
    }
  }),
)
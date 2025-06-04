import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExerciseOnList, ListExercises } from "../../models/exercises.interface";
import { ExercisesStore } from "../store/exercises.store";

export const selectExersisesState = createFeatureSelector<ExercisesStore>('exercises');

export const selectListSelected = createSelector(
    selectExersisesState, (state): ListExercises | null => state.setOfExcersices 
)

export const selectListSelectedToDelete = createSelector(
    selectExersisesState, (state): {day: number, poss: number} => state.listOfExcersicesToDelete
)

export const selectIsOpenDialogNewExercise = createSelector(
    selectExersisesState, (state): boolean => state.isOpenNewExercise
)

export const selectIsSavingListOfExercises = createSelector(
    selectExersisesState, (state): boolean => state.isLoadingListOfExercises
)

export const selectListOfExercises = createSelector(
    selectExersisesState, (state): ExerciseOnList[] => state.listOfExercises
)
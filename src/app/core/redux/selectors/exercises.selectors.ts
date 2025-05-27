import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListExercises } from "../../models/exercises.interface";
import { ExercisesStore } from "../store/exercises.store";

export const selectExersisesState = createFeatureSelector<ExercisesStore>('exercises');

export const selectListSelected = createSelector(
    selectExersisesState, (state): ListExercises | null => state.listOfExcersices 
)
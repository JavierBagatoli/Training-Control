import { Exercise, ExerciseOnList, ListExercises } from "../../models/exercises.interface";

export interface ExercisesStore{
    setOfExcersices: ListExercises | null,
    listOfExcersicesToDelete: {
        day: number,
        poss: number,
    },
    isOpenNewExercise: boolean,
    isLoadingListOfExercises: boolean,
    listOfExercises: ExerciseOnList[]
}
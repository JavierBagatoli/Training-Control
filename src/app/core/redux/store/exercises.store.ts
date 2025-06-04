import { ListExercises } from "../../models/exercises.interface";

export interface ExercisesStore{
    listOfExcersices: ListExercises | null,
    listOfExcersicesToDelete: {
        day: number,
        poss: number,
    },
    isOpenNewExercise: boolean,
}
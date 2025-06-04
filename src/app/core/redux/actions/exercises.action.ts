import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ExerciseOnList, ListExercises } from "../../models/exercises.interface";

export const exercisesActions = createActionGroup({
    source: 'exercises',
    events: {
        'Restart':emptyProps(),

        'Set List of Exercises': props<{list: ListExercises | null}>(),
        'Delete List of Exercises of Day': props<{day: number, poss:number}>(),

        'Open Dialog New Exercise': emptyProps(),
        'Close Dialog New Exercise': emptyProps(),

        'Load List Exercises': emptyProps(),
        'Load List Exercises Complete': props<{data: ExerciseOnList[]}>(),

        'Save List Exercises': props<{data: any}>(),
        'Save List Exercises Complete': emptyProps(),

        'Load Set Exercises': emptyProps(),
        'Load Set Exercises Complete': props<{data: any[]}>(),

        'Save Set Exercises': props<{data: any}>(),
        'Save Set Exercises Complete': emptyProps(),
    }
})
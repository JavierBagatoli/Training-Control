import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ListExercises } from "../../models/exercises.interface";

export const exercisesActions = createActionGroup({
    source: 'exercises',
    events: {
        'Restart':emptyProps(),

        'Set List of Exercises': props<{list: ListExercises | null}>(),
        'Delete List of Exercises of Day': props<{day: number, poss:number}>(),

        'Open Dialog New Exercise': emptyProps(),
        'Close Dialog New Exercise': emptyProps(),
    }
})
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ListExercises } from "../../models/exercises.interface";

export const exercisesActions = createActionGroup({
    source: 'exercises',
    events: {
        'Restart':emptyProps(),

        'Set List of Exercises': props<{list: ListExercises}>()
    }
})
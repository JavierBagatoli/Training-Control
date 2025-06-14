export interface ListExercises{
    name: string,
    listOfExercises: Exercise[],
}

export interface Exercise{
    amount: number,
    id: number,
    name: string,
    zona: string,
}

export type ExerciseOnList = Omit<Exercise, 'amount'>
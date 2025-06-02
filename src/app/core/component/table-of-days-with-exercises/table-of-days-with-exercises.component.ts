import { Component, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ListOfExercisesComponent } from "../list-of-exercises/list-of-exercises.component";
import { ListExercises } from '../../models/exercises.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectListSelected } from '../../redux/selectors/exercises.selectors';
import { Store } from '@ngrx/store';
import { ExercisesStore } from '../../redux/store/exercises.store';

@Component({
    selector: 'table-of-days-with-exercises',
    templateUrl: './table-of-days-with-exercises.component.html',
    styleUrl: './table-of-days-with-exercises.component.scss',
    standalone: true,
    imports: [
    DividerModule,
    CommonModule,
    ListOfExercisesComponent
]
})
export class TableOfDaysWithExercisesComponent{
    private readonly store = inject(Store<{
    exercises: ExercisesStore
  }>)

    readonly listSelected = toSignal(
        this.store.select(selectListSelected)
    )
    
    weeks = input.required<
        {id: number, name: string,  activity: ListExercises[]}[]
    >()
    listOfDayCellphone = input<number[]>([0,1,2,3,4,5,6])
    idDaySelected = input.required<number>()

    selectDay = output<number>();
    actionToDelete = output<{day: number, numberPoss: number}>();

    isValidClick : boolean = true;
    
    emmitClick(button: number, $event: any){
        setTimeout(() => {
            if(this.isValidClick){
                this.selectDay.emit(button);
            }
        },1)
        
    }
    
    cancelEmmitClick(){
        this.isValidClick = false;
        console.log("click")
        setTimeout(() => {
            this.isValidClick = true;
        },3)
    }

    deleteList(day: number, $event: any){
        this.weeks()[day].activity = this.weeks()[day].activity.filter((_activity, index) => index !== $event)
        localStorage.setItem('calendario', JSON.stringify(this.weeks()))
    }
}
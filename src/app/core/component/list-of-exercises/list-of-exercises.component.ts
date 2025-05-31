import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ListExercises } from '../../models/exercises.interface';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'list-of-exercises',
    templateUrl: './list-of-exercises.component.html',
    styleUrl: './list-of-exercises.component.scss',
    styles: [
        `:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }`
    ],
    standalone: true,
    imports: [
        DividerModule,
        CommonModule,
        SliderModule,
        FormsModule
    ]
})
export class ListOfExercisesComponent implements OnInit {
    isOpenDetail: boolean = false;
    data = input<ListExercises[]>()
    listIdsOpen: number[] = []
    listIdsCompletes: number[] = []
    isComplete: boolean = false;
    deleteListAction = output<number>()

    progressToDelete: number[] = []

    ngOnInit() {}

    setIdsOpen(id:number):void{
        if(!this.listIdsOpen.includes(id)){
            this.listIdsOpen.push(id)
        }else{
            this.listIdsOpen = this.listIdsOpen.filter(i => i !==id)
        }
    }

    setIdsComplete(id:number):void{
        if(!this.listIdsCompletes.includes(id)){
            this.listIdsCompletes.push(id)
        }else{
            this.listIdsCompletes = this.listIdsCompletes.filter(i => i !==id)
        }
    }

    deleteList(id: number):void{
        if(this.progressToDelete[id] === 100){
            this.listIdsOpen = this.listIdsOpen.filter((idPoss) => idPoss !==id);
            this.deleteListAction.emit(id);
            this.progressToDelete[id]=0;
        }
    }
}
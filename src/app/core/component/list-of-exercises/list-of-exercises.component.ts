import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ListExercises } from '../../models/exercises.interface';

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
    ]
})
export class ListOfExercisesComponent implements OnInit {
    isOpenDetail: boolean = false;
    data = input<ListExercises[]>()
    listIdsOpen: number[] = []
    listIdsCompletes: number[] = []
    isComplete: boolean = false;

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
}
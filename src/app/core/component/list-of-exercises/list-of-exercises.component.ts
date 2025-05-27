import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ListExercises } from '../../models/exercises.interface';

@Component({
    selector: 'list-of-exercises',
    templateUrl: './list-of-exercises.component.html',
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

    ngOnInit() {}
}
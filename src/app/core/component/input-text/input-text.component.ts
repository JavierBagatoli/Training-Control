import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    styles: [
        `:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }`
    ],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FloatLabel]
})
export class InputTextComponent implements OnInit {
    label = input.required<string>()
    formControl = input<FormControl>(new FormControl())
    clickAction = output()

    ngOnInit() {}

    action(){
        this.clickAction.emit()
    }
}
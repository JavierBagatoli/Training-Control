import { Component, forwardRef, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

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
        InputTextModule],
})
export class InputTextComponent implements OnInit {
    label = input.required<string>()
    formControl = input.required<FormControl<any>>()
    clickAction = output()

    ngOnInit() {}

    action(){
        this.clickAction.emit()
    }
}
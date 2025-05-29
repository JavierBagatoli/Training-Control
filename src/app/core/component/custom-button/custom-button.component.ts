import { Component, input, OnInit, output } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'custom-button',
    templateUrl: './custom-button.component.html',
    styles: [
        `:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }`
    ],
    standalone: true,
    imports: [
        DragDropModule,
        CheckboxModule,
        CommonModule,
        ButtonModule]
})
export class CustomButtonComponent implements OnInit {
    disabled = input<boolean>()
    label = input.required<string>()
    clickAction = output()

    ngOnInit() {}

    action(){
        this.clickAction.emit()
    }
}
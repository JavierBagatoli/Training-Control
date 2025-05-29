import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    selector: 'section-three-buttons',
    templateUrl: './section-three-buttons.component.html',
    styleUrl: './section-three-buttons.component.scss',
    standalone: true,
    imports: [
        DividerModule,
        CommonModule,
        CustomButtonComponent
    ]
})
export class SectionThreeButtonsComponent{
    listOfLabels = input.required<string[]>();
    listOfDisableds = input<boolean[]>([false,false,false]);
    actionEmmit = output<0 | 1 | 2>();

    emmitClick(button: 0 | 1 | 2){
        this.actionEmmit.emit(button);
    }
}
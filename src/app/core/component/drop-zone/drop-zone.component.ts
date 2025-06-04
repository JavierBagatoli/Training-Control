import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'drop-zone',
    templateUrl: './drop-zone.component.html',
    styleUrl: './drop-zone.component.scss',
    standalone: true,
    imports: [
        DividerModule,
        CommonModule,
    ],
})
export class SectionThreeButtonsComponent{
    label = input.required<string>();
    isDeleteMode = input<boolean>();
}
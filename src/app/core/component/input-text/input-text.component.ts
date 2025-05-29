import { Component, forwardRef, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
    label = input.required<string>()
    formControl = input.required<FormControl<any>>()
    clickAction = output()
    
    value: string = '';
    onChange = (value: any) => {};
    onTouched = () => {};

    ngOnInit() {}

    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    action(){
        this.clickAction.emit()
    }
}
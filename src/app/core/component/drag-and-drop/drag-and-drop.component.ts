import { Component, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { InputTextComponent } from "../input-text/input-text.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styles: [
        `:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }`
    ],
    standalone: true,
    imports: [DragDropModule, CommonModule, CheckboxModule, CustomButtonComponent, InputTextComponent]
})
export class DragDropBasicDemo implements OnInit {
    availableProducts: any[] | undefined;

    selectedProducts: {
        id: number,
        name: string,
    }[]= [];

    draggedProduct: any | undefined | null;

    setOfExercises: {
        name: string,
        listOfExercises: {
            id: number,
            name: string,
        }[]
    }[]  = []

    form = new FormGroup({
        nameSetOfExercise: new FormControl<string | null>(null, Validators.required)
    })

    ngOnInit() {
        this.selectedProducts = [];
        this.availableProducts = [
            {id:'1', name: 'Press Pecho'},
            {id:'2', name: 'Press Pecho Inclinado'},
            {id:'3', name: 'Pullover en Máquina'},
            {id:'4', name: 'Press Militar'},
            {id:'5', name: 'Black Watch'},
            {id:'6', name: 'Bamboo Watch'},
            {id:'7', name: 'AAA'},
            {id:'8', name: 'BBBB'},
            {id:'9', name: 'Black Watch'},
            {id:'10', name: 'Bamboo Watch'},
            {id:'11', name: 'AAA'},
            {id:'12', name: 'BBBB'},
            {id:'13', name: 'Black Watch'},
            {id:'14', name: 'Bamboo Watch'},
            {id:'15', name: 'AAA'},
            {id:'16', name: 'BBBB'},
        ]
    }

    dragStart(product: any) {
        this.draggedProduct = product;
    }

    drop() {
        if (this.draggedProduct) {
            let draggedProductIndex = this.findIndex(this.draggedProduct);
            this.selectedProducts = [...(this.selectedProducts as any[]), this.draggedProduct];
            this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
            this.draggedProduct = null;
        }
    }

    get nameSetOfExercise(){
        return this.form.controls['nameSetOfExercise']
    }

    dragEnd() {
        this.draggedProduct = null;
    }

    findIndex(product: any) {
        let index = -1;
        for (let i = 0; i < (this.availableProducts as any[]).length; i++) {
            if (product.id === (this.availableProducts as any[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

    saveGroupOfExercises(){
        this.setOfExercises.push( {
            name: this.nameSetOfExercise!.value!,
            listOfExercises: this.selectedProducts
        });
        this.form.reset();
    }
}
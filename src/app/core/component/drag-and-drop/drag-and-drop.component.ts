import { Component, inject, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { InputTextComponent } from "../input-text/input-text.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Exercise, ListExercises } from '../../models/exercises.interface';
import { exercisesActions } from '../../redux/actions/exercises.action';
import { ExercisesStore } from '../../redux/store/exercises.store';

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
    imports: [
        DragDropModule,
        CommonModule,
        CheckboxModule,
        CustomButtonComponent,
        InputTextComponent,
        ReactiveFormsModule,
        InputTextComponent,
        FormsModule
    ]
})
export class DragDropBasicDemo implements OnInit {
    private readonly store = inject(
        Store<{
            excersices: ExercisesStore
        }>
    )

    availableProducts: any[] | undefined;

    selectedProducts: Exercise[] = [];

    draggedProduct: any | undefined | null;

    setOfExercises: ListExercises[] = []

    formGroup: FormGroup;

    idListPackExercises: number = -1
    
    constructor(private _fb: FormBuilder){
        this.formGroup = this._fb.group({
            nameSetOfExercise: new FormControl<string | null>(null, Validators.required)
        });
    }

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
            
            this.formGroup.addControl(
                `amountOfExercise${this.selectedProducts.length-1}`,
                new FormControl(0,[Validators.required, Validators.min(0)]));
        }
    }

    get nameSetOfExercise(){
        return this.formGroup.controls['nameSetOfExercise'] as FormControl
    }

    controlItem(id: number): FormControl{
        return this.formGroup.controls[`amountOfExercise${id}`] as FormControl
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

    saveGroupOfExercises():void{
        this.setOfExercises.push( {
            name: this.nameSetOfExercise!.value!,
            listOfExercises: this.selectedProducts
        });
        this.selectedProducts = [];
        this.formGroup.reset();
    }

    setAmountOfExercise(id: number, $event: any):void{
        this.selectedProducts[id].amount = this.formGroup.controls[`amountOfExercise${id}`].value
    }

    setList(list : any, id : number):void{
        console.log("Limpiar",this.idListPackExercises, id)
        if(this.idListPackExercises !== id){
            this.store.dispatch(
                exercisesActions.setListOfExercises({list: list})
            )
            this.idListPackExercises = id;
            return
        }

        console.log("Limpiar",this.idListPackExercises, id)
        this.store.dispatch(
            exercisesActions.setListOfExercises({list: null})
        )
        this.idListPackExercises = -1;
    }
}
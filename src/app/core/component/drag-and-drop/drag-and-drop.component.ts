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
            nameSetOfExercise: new FormControl<string | null>(null, Validators.required),
            filter: new FormControl<string>('')
        });
    }

    ngOnInit() {
        this.selectedProducts = [];
        this.availableProducts = [
            {id:'1', name: 'Press Banca'},
            {id:'2', name: 'Press Inclinado con Mancuernas'},
            {id:'3', name: 'Press Declinado'},
            {id:'4', name: 'Aperturas con Mancuernas'},
            {id:'5', name: 'Pullover con Mancuerna'},
            {id:'6', name: 'Press Militar con Barra'},
            {id:'7', name: 'Press Arnold'},
            {id:'8', name: 'Elevaciones Laterales'},
            {id:'9', name: 'Elevaciones Frontales'},
            {id:'10', name: 'Pájaros (Deltoide Posterior)'},
            {id:'11', name: 'Remo con Barra'},
            {id:'12', name: 'Remo en Máquina'},
            {id:'13', name: 'Jalón al Pecho'},
            {id:'14', name: 'Jalón Dorsal Trasnuca'},
            {id:'15', name: 'Dominadas'},
            {id:'16', name: 'Peso Muerto'},
            {id:'17', name: 'Curl Bíceps con Barra'},
            {id:'18', name: 'Curl Bíceps Alterno'},
            {id:'19', name: 'Curl Concentrado'},
            {id:'20', name: 'Curl en Banco Scott'},
            {id:'21', name: 'Extensión de Tríceps en Polea'},
            {id:'22', name: 'Press Francés con Barra'},
            {id:'23', name: 'Fondos en Paralelas'},
            {id:'24', name: 'Patada de Tríceps'},
            {id:'25', name: 'Sentadillas con Barra'},
            {id:'26', name: 'Prensa de Piernas'},
            {id:'27', name: 'Zancadas con Mancuernas'},
            {id:'28', name: 'Extensiones de Piernas'},
            {id:'29', name: 'Curl Femoral'},
            {id:'30', name: 'Elevación de Talones de Pie'},
            {id:'31', name: 'Elevación de Talones Sentado'},
            {id:'32', name: 'Crunch Abdominal'},
            {id:'33', name: 'Elevaciones de Piernas'},
            {id:'34', name: 'Plancha'},
            {id:'35', name: 'Ab Wheel'},
            {id:'36', name: 'Mountain Climbers'},
            {id:'37', name: 'Burpees'},
            {id:'38', name: 'Jumping Jacks'},
            {id:'39', name: 'Peso Muerto Rumano'},
            {id:'40', name: 'Face Pull'},
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

    get filter(){
        return this.formGroup.controls['filter'] as FormControl
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
        const previewValue : string = this.formGroup.controls['filter'].value
        this.formGroup.reset();
        this.formGroup.controls['filter'].setValue(previewValue)
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
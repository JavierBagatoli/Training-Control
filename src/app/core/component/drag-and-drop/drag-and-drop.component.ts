import { Component, computed, inject, OnInit } from '@angular/core';
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
import { InputTextModule } from 'primeng/inputtext';
import { listOfExercises } from '../../../store/list-of-exercises';
import { SectionThreeButtonsComponent } from "../drop-zone/drop-zone.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { selectListOfExercises } from '../../redux/selectors/exercises.selectors';

@Component({
    selector: 'drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrl: './drag-and-drop.component.scss',
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
    FormsModule,
    InputTextModule,
    SectionThreeButtonsComponent
]
})
export class DragDropBasicDemo implements OnInit {
    private readonly store = inject(
        Store<{
            excersices: ExercisesStore
        }>
    )

    availableProducts = toSignal(this.store.select(selectListOfExercises))


    selectedProducts: Exercise[] = [];
    draggedProduct: any | undefined | null;
    setOfExercises: ListExercises[] = []
    formGroup: FormGroup;

    idListPackExercises: number = -1

    idForEditSetofExercises : number = -1;
    
    readonly showDeleteButonOnList = computed(() => {
       return this.availableProducts()?.some(e => e.id > 10000)
    })

    isModeDelete: boolean = false;


    constructor(private _fb: FormBuilder){
        this.formGroup = this._fb.group({
            nameSetOfExercise: new FormControl<string | null>(null, Validators.required),
            filter: new FormControl<string>('')
        });
    }

    ngOnInit() {
        this.selectedProducts = [];
        if(localStorage.getItem('setOfExercises')){
            this.setOfExercises = JSON.parse(localStorage.getItem('setOfExercises') as any)
        }
    }

    dragStart(product: any) {
        this.draggedProduct = product;
    }

    drop() {
        if (this.draggedProduct) {
            let existIdOnResult = false;

            this.selectedProducts.forEach(
                (product) => {
                    if(product.id === this.draggedProduct.id){
                        existIdOnResult = true;
                    }
                }
            )

            if(!existIdOnResult){
                this.selectedProducts = [...(this.selectedProducts as any[]), this.draggedProduct];
                this.draggedProduct = null;
                this.formGroup.addControl(
                    `amountOfExercise${this.selectedProducts.length-1}`,
                    new FormControl(0,[Validators.required, Validators.min(0)]));
            }
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
        for (let i = 0; i < (this.availableProducts() as any[]).length; i++) {
            if (product.id === (this.availableProducts() as any[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

    saveGroupOfExercises():void{
        if(this.idForEditSetofExercises === -1){
            this.setOfExercises.push( {
                name: this.nameSetOfExercise.value,
                listOfExercises: this.selectedProducts
            });
        }else{
            this.setOfExercises[this.idForEditSetofExercises] = {
                name: this.nameSetOfExercise.value,
                listOfExercises: this.selectedProducts
            };

            this.idForEditSetofExercises = -1
        }

        this.selectedProducts = [];
        const previewValue : string = this.formGroup.controls['filter'].value
        this.formGroup.reset();
        this.formGroup.controls['filter'].setValue(previewValue)
        localStorage.setItem('setOfExercises', JSON.stringify(this.setOfExercises))
    }

    setAmountOfExercise(id: number):void{
        this.selectedProducts = JSON.parse(JSON.stringify(this.selectedProducts))
        this.selectedProducts[id] = {
            ...this.selectedProducts[id],
            amount: this.formGroup.controls[`amountOfExercise${id}`].value
        }
    }

    setList(list : any, id : number):void{
        if(this.idListPackExercises !== id){
            this.store.dispatch(
                exercisesActions.setListOfExercises({list: list})
            )
            this.idListPackExercises = id;
            return
        }

        this.store.dispatch(
            exercisesActions.setListOfExercises({list: null})
        )
        this.idListPackExercises = -1;
    }

    deleteSet(){
        this.setOfExercises.splice(this.idListPackExercises, 1);

        this.store.dispatch(
            exercisesActions.setListOfExercises({list: null})
        )
        this.idListPackExercises = -1;
        localStorage.setItem('setOfExercises', JSON.stringify(this.setOfExercises))
    }

    editSet(){
        this.setOfExercises[this.idListPackExercises].listOfExercises.forEach((exer,index) => {
            this.formGroup.setControl(
                `amountOfExercise${index}`,
                new FormControl(exer.amount,[Validators.required, Validators.min(0)]));
        })

        this.selectedProducts = this.setOfExercises[this.idListPackExercises].listOfExercises;

        this.idForEditSetofExercises = this.idListPackExercises;
        this.nameSetOfExercise.setValue(this.setOfExercises[this.idListPackExercises].name);
    }

    cancelEditSet(){
        this.selectedProducts = [];
        this.idForEditSetofExercises = -1;
        this.nameSetOfExercise.setValue(null);
    }

    addNewExercise(){
        this.store.dispatch(exercisesActions.openDialogNewExercise())
    }

    activateModeDelete(){
        this.isModeDelete = !this.isModeDelete;
    }

    dropForDelete(){
        let odlList = localStorage.getItem('ListOfExercises')

        if(odlList){
            try{    
                let odlListOfExercises = JSON.parse(odlList) as Exercise[]
                let newList = odlListOfExercises.filter(exer => exer.id !== this.draggedProduct.id)
                this.store.dispatch(
                    exercisesActions.saveListExercises({data: newList})
                )
            }catch(_e){

            }
        }
    }
}
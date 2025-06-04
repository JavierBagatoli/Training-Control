import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ExercisesStore } from '../../redux/store/exercises.store';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsOpenDialogNewExercise } from '../../redux/selectors/exercises.selectors';
import { exercisesActions } from '../../redux/actions/exercises.action';
import { DrawerModule } from 'primeng/drawer';
import { InputTextComponent } from "../input-text/input-text.component";
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { Exercise } from '../../models/exercises.interface';

@Component({
    selector: 'form-new-exercise',
    templateUrl: './form-new-exercise.component.html',
    styleUrl:'./form-new-exercise.component.scss',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DrawerModule,
    InputTextComponent,
    CustomButtonComponent,
],
})
export class FormNewExerciseComponent{
  private readonly store = inject(Store<{
    exercises: ExercisesStore
  }>)

  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    zona: new FormControl<string | null>(null, Validators.required)
  })

  readonly isVisible = toSignal(
    this.store.select(selectIsOpenDialogNewExercise)
  )

  actionAddNewExercise = output<Omit<Exercise, 'amount'>>()

  constructor(){}

  get nameExercise():FormControl {
    return this.form.controls['name'] as FormControl
  }

  get zoneExercise():FormControl {
    return this.form.controls['zona'] as FormControl
  }

  closePage(){
    this.store.dispatch(
        exercisesActions.closeDialogNewExercise()
    )
  }

  addNewExercise(){
    const val = {
      ...this.form.value,
      id: (new Date()).getTime(),
    } as Omit<Exercise,'amount'>

    this.actionAddNewExercise.emit(val)
    this.store.dispatch(exercisesActions.closeDialogNewExercise())
  }
}
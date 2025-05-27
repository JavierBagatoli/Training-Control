import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DragDropBasicDemo } from "./core/component/drag-and-drop/drag-and-drop.component";
import { ListOfExercisesComponent } from "./core/component/list-of-exercises/list-of-exercises.component";
import { Store } from '@ngrx/store';
import { selectListSelected } from './core/redux/selectors/exercises.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExercisesStore } from './core/redux/store/exercises.store';
import { ListExercises } from './core/models/exercises.interface';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    DragDropBasicDemo,
    ListOfExercisesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store<{
    exercises: ExercisesStore
  }>)

  title = 'excersice-app';
  weeks : {id: number, name: string,  activity: ListExercises[]}[]= [
    {id: 0, name: "Domingo",  activity:[]},
    {id: 1, name: "Lunes",    activity:[]},
    {id: 2, name: "Martes",   activity:[]},
    {id: 3, name: "Miercoles",activity:[]},
    {id: 4, name: "Jueves",   activity:[]},
    {id: 5, name: "Viernes",  activity:[]},
    {id: 6, name: "Sabado",   activity:[]},
  ];
  idDaySelected: number = -1;

  readonly listSelected = toSignal(
    this.store.select(selectListSelected)
  )


  constructor(@Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
  }

  selectDay(i:number):void{
    this.idDaySelected = i;
    if(this.listSelected() !== null){
      const list = this.listSelected()!
      this.weeks[i].activity.push(list)
    }
  }
}

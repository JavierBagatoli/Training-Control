import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DragDropBasicDemo } from "./core/component/drag-and-drop/drag-and-drop.component";
import { ListOfExercisesComponent } from "./core/component/list-of-exercises/list-of-exercises.component";
import { InputTextComponent } from './core/component/input-text/input-text.component';

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
export class AppComponent {
  title = 'excersice-app';
  weeks = [
    {id: 0, name: "Domingo",},
    {id: 1, name: "Lunes",},
    {id: 2, name: "Martes",},
    {id: 3, name: "Miercoles"},
    {id: 4, name: "Jueves",},
    {id: 5, name: "Viernes",},
    {id: 6, name: "Sabado",},
  ];
  idDaySelected: number = -1;

  constructor(@Inject(DOCUMENT) document: Document) { }
}

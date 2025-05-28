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
import { of } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CustomButtonComponent } from "./core/component/custom-button/custom-button.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    DragDropBasicDemo,
    ListOfExercisesComponent,
    CustomButtonComponent
],
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

  isMobile: boolean = false;
  pageNumber: 0 | 1 = 0;
  listOfDayCellphone: number[] = [0,1]
  constructor(@Inject(DOCUMENT) document: Document, private breakpointObserver: BreakpointObserver,) {
    this.breakpointObserver.observe([
      "(max-width: 720px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          this.isMobile = true; 
      } else {
          this.isMobile = false;
      }
    });
  }

  ngOnInit(): void {
  }

  selectDay(i:number):void{
    this.idDaySelected = i;
    if(this.listSelected() !== null){
      const list = this.listSelected()!
      this.weeks[i].activity.push(list)
    }
  }

  switchOneDay(n:1|-1){
    if(n === 1){
      const lastNumberDay :number = this.listOfDayCellphone[this.listOfDayCellphone.length-1] 
      if(lastNumberDay < 6){ 
        this.listOfDayCellphone.push(lastNumberDay+1)
        this.listOfDayCellphone = this.listOfDayCellphone.filter(a => a !== this.listOfDayCellphone[0])
      }
    }else{
      const firstNumberDay :number = this.listOfDayCellphone[0] 
      if(firstNumberDay > 0){ 
        this.listOfDayCellphone.unshift(firstNumberDay-1)
        this.listOfDayCellphone = this.listOfDayCellphone.filter(a => a !== this.listOfDayCellphone[this.listOfDayCellphone.length-1])
      }
    }
  }

  deleteList(id: number, $event: any):void{
    console.log($event)
    this.weeks[id].activity = this.weeks[id].activity.filter((_activity, index) => index !== $event)
  }
}

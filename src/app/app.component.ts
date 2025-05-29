import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DragDropBasicDemo } from "./core/component/drag-and-drop/drag-and-drop.component";
import { Store } from '@ngrx/store';
import { selectListSelected } from './core/redux/selectors/exercises.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExercisesStore } from './core/redux/store/exercises.store';
import { ListExercises } from './core/models/exercises.interface';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SectionThreeButtonsComponent } from "./core/component/section-three-buttons/section-three-buttons.component";
import { TableOfDaysWithExercisesComponent } from "./core/component/table-of-days-with-exercises/table-of-days-with-exercises.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    DragDropBasicDemo,
    SectionThreeButtonsComponent,
    TableOfDaysWithExercisesComponent
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
      const persistencia : string | null | undefined = localStorage.getItem('calendario') ;   
      console.log(persistencia)
      if(persistencia){
        this.weeks = JSON.parse(persistencia);
      } 
  }

  selectDay(i:number):void{
    this.idDaySelected = i;
    if(this.listSelected() !== null){
      const list = this.listSelected()!
      this.weeks[i].activity.push(list)
      localStorage.setItem('calendario', JSON.stringify(this.weeks));
    }
  }

  switchOneDay(n:0 | 1 | 2){
    if(n === 2){//crecimiento a la derecha
      const lastNumberDay :number = this.listOfDayCellphone[this.listOfDayCellphone.length-1] 
      if(lastNumberDay < 6){ 
        this.listOfDayCellphone.push(lastNumberDay+1)
        this.listOfDayCellphone = this.listOfDayCellphone.filter(a => a !== this.listOfDayCellphone[0])
      }
    }else{//crecimiento a la izquierda
      const firstNumberDay :number = this.listOfDayCellphone[0] 
      if(firstNumberDay > 0){ 
        this.listOfDayCellphone.unshift(firstNumberDay-1)
        this.listOfDayCellphone = this.listOfDayCellphone.filter(a => a !== this.listOfDayCellphone[this.listOfDayCellphone.length-1])
      }
    }
  }

  deleteList(id: number, $event: any):void{
    this.weeks[id].activity = this.weeks[id].activity.filter((_activity, index) => index !== $event)

    localStorage.setItem('calendario', JSON.stringify(this.weeks))
  }

  setPage(pageNro: 0 | 1 | 2){
    if(pageNro === 0){
      this.pageNumber = 0
    }else{
      this.pageNumber = 1
    }
  }
}

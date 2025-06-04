import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DragDropBasicDemo } from "./core/component/drag-and-drop/drag-and-drop.component";
import { Store } from '@ngrx/store';
import { selectIsOpenDialogNewExercise, selectIsSavingListOfExercises, selectListSelected, selectListSelectedToDelete } from './core/redux/selectors/exercises.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExercisesStore } from './core/redux/store/exercises.store';
import { Exercise, ListExercises } from './core/models/exercises.interface';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SectionThreeButtonsComponent } from "./core/component/section-three-buttons/section-three-buttons.component";
import { TableOfDaysWithExercisesComponent } from "./core/component/table-of-days-with-exercises/table-of-days-with-exercises.component";
import { FormNewExerciseComponent } from "./core/component/form-new-exercise/form-new-exercise.component";
import { listOfExercises } from './store/list-of-exercises';
import { exercisesActions } from './core/redux/actions/exercises.action';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    DragDropBasicDemo,
    SectionThreeButtonsComponent,
    TableOfDaysWithExercisesComponent,
    FormNewExerciseComponent
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
    {id: 0, name: "Lunes",    activity:[]},
    {id: 2, name: "Martes",   activity:[]},
    {id: 3, name: "Miercoles",activity:[]},
    {id: 4, name: "Jueves",   activity:[]},
    {id: 5, name: "Viernes",  activity:[]},
    {id: 6, name: "Sabado",   activity:[]},
    {id: 7, name: "Domingo",  activity:[]},
  ];
  idDaySelected: number = -1;

  readonly listSelected = toSignal(
    this.store.select(selectListSelected)
  )

  isMobile: boolean = false;
  pageNumber: 0 | 1 = 0;
  listOfDayCellphone: number[] = [0,1]
  reloadList : boolean = false

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
      const persistencia : string | null | undefined = localStorage.getItem('calendario');   

      this.store.dispatch(
        exercisesActions.loadListExercises()
      )

      this.store.select(selectIsSavingListOfExercises).subscribe(val => {
        if(val){
          this.reloadList = true;
          setTimeout(() => {
            this.reloadList = false;
          },1)
        }
      })

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

  setPage(pageNro: 0 | 1 | 2){
    if(pageNro === 0){
      this.pageNumber = 0
    }else{
      this.pageNumber = 1
    }
  }

  addNewExercise($event: any){
    let odlListOfExercises = localStorage.getItem('ListOfExercises');

    if(!odlListOfExercises){
      odlListOfExercises = JSON.stringify(listOfExercises)
      localStorage.setItem('ListOfExercises', odlListOfExercises)
    }

    if(odlListOfExercises){
      let newList = JSON.parse(odlListOfExercises)
      newList.push($event)

      this.store.dispatch(
        exercisesActions.saveListExercises({data: newList})
      );
    }
  }
}

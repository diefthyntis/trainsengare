import { Component, OnInit } from '@angular/core';
import { delay, interval, map, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {
  redTrainsCalled = 0;
  yellowTrainsCalled = 0;
  aboutLight!:string;
  aboutTrainCalled!:string;
  aboutTrainArrived!:string;
  done:string[]=[];


  constructor() { }

  ngOnInit() {
    interval(50).pipe(
      take(100),
      map(returnedNumberByInterval => returnedNumberByInterval % 2 === 0 ? 'rouge' : 'jaune'),
      tap(returnedColorByMap => this.displayLight(returnedColorByMap)),
      switchMap(returnedColorByMap => this.getTrainObservable$(returnedColorByMap)),
      tap(returnedTrainByMap => this.displayTrainArrived(returnedTrainByMap.frenchcolor,returnedTrainByMap.index))
    ).subscribe();
  }
  displayTrainArrived(varcolor: string, trainIndex: number): void {
    let sentence = 'Le train '+varcolor+' '+  trainIndex + ' est arrivé';
    let englishColor =this.translateStringColorInProtectedWord(varcolor);
    console.log(sentence, `font-weight: bold; color: ${englishColor}`);
    this.aboutTrainArrived=sentence;
    this.done.push(sentence);
  }

  displayTrainCalled(varcolor: string, trainIndex: number): void {
    let sentence = 'Emission de l appel du train '+varcolor+' '+  trainIndex;
    let englishColor =this.translateStringColorInProtectedWord(varcolor);
    console.log(sentence, `text-decoration: underline; color: ${englishColor}`);
    this.aboutTrainCalled=sentence
    this.done.push(sentence);
  }

  getTrainObservable$(frenchcolor: 'rouge' | 'jaune') {
    const isRedTrain = frenchcolor === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const index = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    this.displayTrainCalled(frenchcolor,index);
    let trainToBeWatched$ =of({ frenchcolor, index }).pipe(delay(isRedTrain ? 500 : 1500));
    return trainToBeWatched$;
  
  }


  translateStringColorInProtectedWord(frenchcolor:string) {
    return frenchcolor === 'rouge' ? 'red' : 'yellow';
  }

  displayLight(lightcolor:string): void {
    let englishColor = this.translateStringColorInProtectedWord(lightcolor);
    const now = new Date();
    let currentTime = now.toLocaleTimeString();
    let sentence = currentTime+ " La lumière s'allume en "+lightcolor;
    console.log(sentence, `color: ${englishColor}`);
    this.done.push(sentence);
  }


}
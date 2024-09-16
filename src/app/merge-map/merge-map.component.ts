import { Component, OnInit } from '@angular/core';
import { delay, interval, map, mergeMap, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {
  redTrainsCalled = 0;
  yellowTrainsCalled = 0;
  aboutLight!:string;
  aboutTrainCalled!:string;
  aboutTrainArrived!:string;
  done:string[]=[];


  constructor() { }

  ngOnInit() {
    // counter est retourné par l'observable interval à la fréquence de 10s (=10000 ms)
    // map reçoit la variable counter et lui applique la fonction ? qui retourne rouge ou jaune
    // map retourne rouge ou jaune
    // tap reçoi rouge ou jaune dans sa variable varcor
    interval(1000).pipe(
      take(10),
      map(returnedNumberByInterval => returnedNumberByInterval % 2 === 0 ? 'rouge' : 'jaune'),
      tap(returnedColorByMap => this.displayLight(returnedColorByMap)),
      mergeMap(returnedColorByMap => this.getTrainObservable$(returnedColorByMap)),
      tap(returnedTrainByMergeMap => this.displayTrainArrived(returnedTrainByMergeMap.frenchcolor,returnedTrainByMergeMap.index))
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
    let sentence = 'Le train '+varcolor+' '+  trainIndex + ' a été appelé';
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
    let trainToBeWatched$ =of({ frenchcolor, index }).pipe(delay(isRedTrain ? 5000 : 6000));
    return trainToBeWatched$;
  
  }


  translateStringColorInProtectedWord(frenchcolor:string) {
    return frenchcolor === 'rouge' ? 'red' : 'yellow';
  }

  displayLight(lightcolor:string): void {
    let englishColor = this.translateStringColorInProtectedWord(lightcolor);
    let sentence = "La lumière s'allume en "+lightcolor;
    console.log(sentence, `color: ${englishColor}`);
    this.done.push(sentence);
  }


}
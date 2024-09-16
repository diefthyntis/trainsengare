import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { ConcatMapComponent } from './concat-map/concat-map.component';
import { ExhaustMapComponent } from './exhaust-map/exhaust-map.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';

const routes: Routes = [
  { path:'merge',component:MergeMapComponent },
  { path:'concat',component:ConcatMapComponent},
  { path:'exhaust',component:ExhaustMapComponent},
  { path:'switch',component:SwitchMapComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

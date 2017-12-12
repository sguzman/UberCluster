import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UberMapPage } from './uber-map';

@NgModule({
  declarations: [
    UberMapPage,
  ],
  imports: [
    IonicPageModule.forChild(UberMapPage),
  ],
})
export class UberMapPageModule {}

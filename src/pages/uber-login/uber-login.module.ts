import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UberLoginPage } from './uber-login';

@NgModule({
  declarations: [
    UberLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(UberLoginPage),
  ],
})
export class UberLoginPageModule {}

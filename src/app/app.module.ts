import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UberMapPage} from "../pages/uber-map/uber-map";
import {FilterModalComponent} from "../components/filter-modal/filter-modal";
import { FilterTimeProvider } from '../providers/filter-time/filter-time';

@NgModule({
  declarations: [
    MyApp,
    UberMapPage,
    FilterModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UberMapPage,
    FilterModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilterTimeProvider,
  ]
})
export class AppModule {}

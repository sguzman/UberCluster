import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {data} from '../../data/cache.data'

@IonicPage()
@Component({
  selector: 'page-uber-login',
  templateUrl: 'uber-login.html',
})
export class UberLoginPage {
  trips: any[] = [];

  constructor() {
    this.trips = data.items;
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad UberLoginPage');
  }
}
